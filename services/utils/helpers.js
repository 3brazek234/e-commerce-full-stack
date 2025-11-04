const jwt = require("jsonwebtoken");
const handleToken = (token) => {
  return jwt.sign({ token }, process.env.JWT_SECRET, { expiresIn: "1h" });
};
module.exports = handleToken;
