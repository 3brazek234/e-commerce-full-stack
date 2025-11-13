// controllers/stripeController.js
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); 
const Payment = require('../models/paymentModels'); 
const Order = require('../models/orderModels');     

const createPaymentIntent = async (req, res) => {
  const { orderId, items, shippingAddress } = req.body; // أضفت shippingAddress
  const userId = req.user.id; 

  try {
    let order;
    let amountInCents;

    if (orderId) {
      order = await Order.findById(orderId);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      if (order.userId.toString() !== userId.toString()) {
        return res.status(403).json({ message: "Unauthorized to pay for this order." });
      }
      amountInCents = Math.round(order.totalAmount * 100);
    } else if (items && items.length > 0) {
      const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      amountInCents = Math.round(totalAmount * 100);

      order = new Order({
        userId: userId,
        items: items.map(item => ({
            productId: item.productId, 
            name: item.name,
            quantity: item.quantity,
            price: item.price,
        })),
        totalAmount: totalAmount,
        status: 'pending',
        shippingAddress: shippingAddress, 
      });
      await order.save();
    } else {
      return res.status(400).json({ message: "Order ID or items are required." });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
      metadata: {
        order_id: order._id.toString(), 
        user_id: userId.toString(),
      },
    });

    const newPayment = await Payment.create({
      userId: userId,
      orderId: order._id, 
      stripePaymentIntentId: paymentIntent.id,
      amount: amountInCents / 100,
      currency: paymentIntent.currency,
      status: 'pending',
      clientSecret: paymentIntent.client_secret,
    });

    order.status = 'pending';
    order.paymentId = newPayment._id; 
    await order.save();
    res.json({ clientSecret: paymentIntent.client_secret, paymentId: newPayment._id, orderId: order._id });

  } catch (error) {
    console.error('Error creating payment intent:', error.message);
    res.status(500).json({ error: error.message });
  }
};
const handleStripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error(`Webhook Error: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // 2. معالجة الأحداث المختلفة
  const paymentIntent = event.data.object;

  switch (event.type) {
    case 'payment_intent.succeeded':
      console.log(`PaymentIntent ${paymentIntent.id} was successful!`);
      await Payment.findOneAndUpdate(
        { stripePaymentIntentId: paymentIntent.id },
        {
          status: 'succeeded',
          receiptEmail: paymentIntent.receipt_email,
          receiptUrl: paymentIntent.charges.data[0].receipt_url,
          paymentMethod: paymentIntent.payment_method_types[0],
          cardBrand: paymentIntent.charges.data[0].payment_method_details?.card?.brand,
          last4: paymentIntent.charges.data[0].payment_method_details?.card?.last4,
        },
        { new: true } 
      );

      if (paymentIntent.metadata.order_id) {
        await Order.findByIdAndUpdate(
          paymentIntent.metadata.order_id,
          { status: 'completed' },
          { new: true }
        );
      }
      break;

    case 'payment_intent.payment_failed':
      console.log(`PaymentIntent ${paymentIntent.id} failed.`);
      await Payment.findOneAndUpdate(
        { stripePaymentIntentId: paymentIntent.id },
        { status: 'failed' },
        { new: true }
      );
      if (paymentIntent.metadata.order_id) {
        await Order.findByIdAndUpdate(
          paymentIntent.metadata.order_id,
          { status: 'failed' },
          { new: true }
        );
      }
      break;

    case 'payment_intent.canceled':
        console.log(`PaymentIntent ${paymentIntent.id} canceled.`);
        await Payment.findOneAndUpdate(
            { stripePaymentIntentId: paymentIntent.id },
            { status: 'canceled' },
            { new: true }
        );
        if (paymentIntent.metadata.order_id) {
            await Order.findByIdAndUpdate(
                paymentIntent.metadata.order_id,
                { status: 'canceled' },
                { new: true }
            );
        }
        break;

    // ممكن تعالج أحداث تانية زي 'charge.refunded' لو فيه Refunds
    case 'charge.refunded':
        const charge = event.data.object;
        // ابحث عن الدفعة المرتبطة بالـ charge.payment_intent
        await Payment.findOneAndUpdate(
            { stripePaymentIntentId: charge.payment_intent },
            { status: 'refunded' },
            { new: true }
        );
        // ممكن تحدث حالة الطلب لـ 'refunded'
        break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.send(); // مهم إنك تبعت 200 OK لـ Stripe
};

module.exports = { createPaymentIntent, handleStripeWebhook };