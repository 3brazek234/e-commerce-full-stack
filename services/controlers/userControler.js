const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const handleToken = require("../utils/helpers");

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Email not found. Please sign up.",
      });
    }

    const matchingPassword = await bcrypt.compare(password, user.password);

    if (!matchingPassword) {
      return res.status(401).json({
        success: false,
        message: "Password isn't correct",
      });
    }

    const payLoad = {
      id: user._id,
      email: user.email,
    };

    const token = handleToken(payLoad);

    return res.status(200).json({
      success: true,
      message: "Logged in successfully!",
      user: {
        id: user._id,
        token,
        email: user.email,
        name: user.name,
        isAdmin: user.isAdmin,
      },
    });
  } catch (err) {
    console.error("Login Error:", err.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  try {
    const isExisting = await User.findOne({ email });
    if (isExisting) {
      return res.status(409).json({
        success: false,
        message: "Email is already existing",
      });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();

    const token = handleToken({ id: user._id, email: user.email });

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        token,
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
  } catch (err) {
    console.error("Register Error:", err.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = { loginUser, register };
