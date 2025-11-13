const Cart = require("../models/Cart");
const Product = require("../models/Product"); // هنحتاج Product Model

const getOrCreateCart = async (req, res) => {
  try {
    const userId = req.user.id; // 🚨🚨 نفترض إن الـ userId متاح من الـ authenticated user

    let cart = await Cart.findOne({ user: userId }).populate(
      "products.product"
    ); // 🚨🚨 Populate عشان نجيب تفاصيل المنتج

    if (!cart) {
      // لو مفيش كارت للمستخدم ده، أنشئ واحدة جديدة
      cart = await Cart.create({ user: userId, products: [] });
    }

    res.status(200).json({
      status: "success",
      data: { cart },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

const addProductToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    const productExists = await Product.findById(productId);
    if (!productExists) {
      return res
        .status(404)
        .json({ status: "fail", message: "Product not found." });
    }
    if (productExists.stock < quantity) {
      return res.status(400).json({
        status: "fail",
        message: "Insufficient stock for this product.",
      });
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = await Cart.create({ user: userId, products: [] });
    }

    const productIndex = cart.products.findIndex(
      (p) => p.product.toString() === productId
    );

    if (productIndex > -1) {
      cart.products[productIndex].quantity = quantity;
    } else {
      cart.products.push({ product: productId, quantity });
    }

    await cart.save();
    await cart.populate("products.product");

    res.status(200).json({
      status: "success",
      message: "Product added/updated in cart.",
      data: { cart },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
const removeProductFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body;

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res
        .status(404)
        .json({ status: "fail", message: "Cart not found for this user." });
    }

    cart.products = cart.products.filter(
      (p) => p.product.toString() !== productId
    );

    await cart.save();
    await cart.populate("products.product");

    res.status(200).json({
      status: "success",
      message: "Product removed from cart.",
      data: { cart },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
const clearCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await Cart.findOneAndUpdate(
      { user: userId },
      { $set: { products: [] } },
      { new: true }
    );

    if (!cart) {
      return res
        .status(404)
        .json({ status: "fail", message: "Cart not found for this user." });
    }
    await cart.populate("products.product");

    res.status(200).json({
      status: "success",
      message: "Cart cleared.",
      data: { cart },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
module.exports = {
  getOrCreateCart,
  addProductToCart,
  removeProductFromCart,
  clearCart,
};
