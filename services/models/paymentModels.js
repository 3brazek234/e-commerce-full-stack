const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  orderId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Order',
    required: false, 
    unique: true, 
  },
  stripePaymentIntentId: { // معرف الدفعة في Stripe (مهم جداً!)
    type: String,
    required: true,
    unique: true,
  },
  amount: {
    type: Number, // يُفضل تخزين المبلغ بالسنتات أو أصغر وحدة عملة
    required: true,
  },
  currency: {
    type: String,
    required: true,
    default: 'usd',
  },
  status: {
    type: String,
    enum: ['pending', 'succeeded', 'failed', 'canceled', 'refunded'], // حالات الدفع المحتملة
    default: 'pending',
  },
  clientSecret: { // للتحقق من حالة الدفع في الـ Frontend
    type: String,
    required: true,
  },
  // تفاصيل إضافية ممكن ترجع من Stripe بعد نجاح الدفع
  receiptEmail: { type: String },
  receiptUrl: { type: String },
  paymentMethod: { type: String },
  cardBrand: { type: String },
  last4: { type: String },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Payment = mongoose.model('Payment', paymentSchema);
module.exports = Payment;