const express = require("express");
const router = express.Router();
const { getAllCategories } = require("../controlers/categoryControler");
const { createCategory } = require("../controlers/categoryControler");
const { updateCategory } = require("../controlers/categoryControler");
const { deleteCategory } = require("../controlers/categoryControler");
const  isAdmin  = require("../middlewares/admin");
const { upload } = require("../middlewares/upload");

router.get("/categories", getAllCategories);
router.post("/categories", upload.single("image"), createCategory);
router.put("/categories/:id", updateCategory);
router.delete("/categories/:id", isAdmin, deleteCategory);
module.exports = router;
