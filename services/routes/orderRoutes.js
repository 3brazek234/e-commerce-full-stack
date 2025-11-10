const express = require("express");
const order = require("../controlers/orderControler");
const router = express.Router();
router.post("/create-payment-intent", order.createPaymentIntent);
router.post("/stripe-webhook", order.handleStripeWebhook);
module.exports = router;
