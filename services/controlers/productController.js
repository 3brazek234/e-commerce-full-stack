const cloudinary = require("../config/cloudinary");
const Product = require("../models/productModels");

export const createProduct = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ status: "fail", message: "No image file uploaded." });
    }
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const dataUri = "data:" + req.file.mimetype + ";base64," + b64;
    const cloudinaryResult = await cloudinary.uploader.upload(dataUri, {
      folder: "product_images",
      public_id: req.file.originalname.split(".")[0] + "-" + Date.now(), 
    });

    const productData = {
      ...req.body,
      images: [{ url: cloudinaryResult.secure_url }], 
    };

    const newProduct = await Product.create(productData);

    res.status(201).json({
      status: "success",
      data: { product: newProduct },
    });

  } catch (err) {
    console.error("Error creating product:", err);
    res.status(500).json({ 
      status: "fail",
      message: err.message || "Failed to create product.",
    });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate({
      path: "category",
      select: "name -_id",
    });

    res.status(200).json({
      status: "success",
      results: products.length,
      data: {
        products,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate({
        path: "category",
        select: "name description",
      })
      .populate({
        path: "reviews",
        select: "review rating user createdAt",
      });

    if (!product) {
      return res.status(404).json({
        status: "fail",
        message: "Product not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        product,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product) {
      return res.status(404).json({
        status: "fail",
        message: "Product not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        product,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({
        status: "fail",
        message: "Product not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        product,
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
  getProduct,
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
