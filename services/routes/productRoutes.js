const express = require("express");
const {
  getAllProducts,
  getProduct,
  createProduct,
} = require("../controlers/productController");
const router = express.Router();

router.get("/products", getAllProducts);
router.get("/products/:id", getProduct);
router.post("/products", createProduct);
module.exports = router;
