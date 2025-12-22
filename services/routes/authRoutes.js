const express = require("express");
const { loginUser, register } = require("../controlers/userControler");
const { registerRules } = require("../middlewares/validation");
const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerRules, register);
module.exports = router;
