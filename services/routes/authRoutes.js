const express = require("express");
const { loginUser, register } = require("../controlers/userControler");
const { validate, registerRules } = require("../middlewares/validation");
const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerRules(), validate, register);
module.exports = router;
