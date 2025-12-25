const Category = require("../models/categoryModels");
const cloudinary = require("../config/cloudinary");

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    if (!categories) {
      return res.status(404).json({
        status: "fail",
        message: "Categories not found",
      });
    }
    res.status(200).json({
      status: "success",
      results: categories.length,
      data: {
        categories,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
 const createCategory = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        status: "fail",
        message: "Category image is required.",
      });
    }

    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const dataUri = "data:" + req.file.mimetype + ";base64," + b64;

    const cloudinaryResult = await cloudinary.uploader.upload(dataUri, {
      folder: "category_images",
      public_id: req.file.originalname.split(".")[0] + "-" + Date.now(),
    });

    const categoryData = {
      ...req.body,
      image: cloudinaryResult.secure_url,
    };
    const newCategory = await Category.create(categoryData);

    res.status(201).json({
      status: "success",
      data: {
        category: newCategory,
      },
    });
  } catch (err) {
    console.error("Error creating category:", err);
    res.status(400).json({
      status: "fail",
      message: err.message || "Failed to create category.",
    });
  }
};
const updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!category) {
      return res.status(404).json({
        status: "fail",
        message: "Category not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        category,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({
        status: "fail",
        message: "Category not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        category,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
module.exports = {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
