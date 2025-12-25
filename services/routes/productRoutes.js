const express = require("express");
const {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controlers/productController");
const isAdmin = require("../middlewares/admin");
const { createProductValidator } = require("../middlewares/validation");
const { upload } = require("../middlewares/upload");
const router = express.Router();


router.get("/products", getAllProducts);
router.get("/products/:id", getProduct);

router.post(
  "/products",
  upload.single("image"), 
  createProductValidator,
  createProduct           
);
router.put("/products/:id", isAdmin, updateProduct);
router.delete("/products/:id", isAdmin, deleteProduct);
module.exports = router;
