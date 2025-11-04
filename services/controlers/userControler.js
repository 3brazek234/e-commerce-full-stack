const pool = require("../config/db");
const bcript = require("bcrypt");
const handleToken = require("../utils/helpers");
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { rows: user } = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    if (user.length === 0) {
      return res.json({
        success: false,
        message: "Email not found sign up",
      });
    }
    const matchingPassword = await bcript.compare(password, user.password);
    if (!matchingPassword) {
      return res.status(401).json({
        success: false,
        message: "Password isn't correct",
      });
    }
    const payLoad = {
      id : user.id,
      email: user.email
    }
    const token = handleToken(payLoad)
    return res.status(200).json({
      success: true,
      message: "Logged in successfully!",
      user: {
        id: user.id,
        token,
        email: user.email,
      },
    });
  } catch (err) {
    console.log(err);
  }
};
