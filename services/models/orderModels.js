// models/Order.js (مثال)
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      name: { type: String, required: true },
      quantity: { type: Number, required: true, min: 1 },
      price: { type: Number, required: true }, // سعر الوحدة بالدولار مثلاً
    }
  ],
  totalAmount: { 
    type: Number,
    required: true,
  },
  address: {
    street: String,
    city: String,
    zip: String,
    country: String,
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'shipped', 'delivered', 'canceled'],
    default: 'pending',
  },
  paymentId: { // ربط الطلب بـ Payment
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Payment',
    unique: true,
    required: false, // ممكن يتضاف بعد إنشاء الدفعة
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;