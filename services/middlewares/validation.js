const { check, body, validationResult } = require("express-validator");

const validatorMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
const registerRules = [
  body("name").notEmpty().withMessage("Name is required").trim().escape(),
  body("email")
    .isEmail()
    .withMessage("Please provide a valid email")
    .normalizeEmail(),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
  validatorMiddleware,
];

const createProductValidator = [
  check("name")
    .notEmpty()
    .withMessage("Product name is required")
    .isLength({ min: 3 })
    .withMessage("Too short product name")
    .isLength({ max: 100 })
    .withMessage("Too long product name")
    .trim(),
  check("description")
    .notEmpty()
    .withMessage("Product description is required")
    .isLength({ max: 1000 })
    .withMessage("Too long description")
    .trim(),
  check("price")
    .notEmpty()
    .withMessage("Product price is required")
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number")
    .toFloat(),
  check("discountPrice")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Discount price must be a positive number")
    .toFloat()
    .custom((value, { req }) => {
      if (req.body.price && value >= req.body.price) {
        throw new Error("Discount price must be lower than regular price");
      }
      return true;
    }),
  check("stock")
    .notEmpty()
    .withMessage("Product stock is required")
    .isInt({ min: 0 })
    .withMessage("Stock must be a positive integer")
    .toInt(),
  check("category")
    .notEmpty()
    .withMessage("Product must belong to a category")
    .isMongoId()
    .withMessage("Invalid ID format"),
  body("image").custom((val, { req }) => {
    if (!req.file) {
      throw new Error("Product Image is required");
    }
    return true;
  }),

  validatorMiddleware,
];
module.exports = {
  registerRules,
  createProductValidator,
};
