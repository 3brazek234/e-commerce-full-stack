const express = require("express");
const router = express.Router();
const {
  getOrCreateCart,
  addProductToCart,
  removeProductFromCart,
  clearCart,
} = require("../controlers/cartController");
const verifyToken = require("../middlewares/verifyToken");
router.get("/", verifyToken, getOrCreateCart);
router.post("/add", verifyToken, addProductToCart);
router.delete("/remove-item", verifyToken, removeProductFromCart);
router.delete("/clear", verifyToken, clearCart);

module.exports = router;
