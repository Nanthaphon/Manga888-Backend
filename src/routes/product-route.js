const express = require("express");
const authenticateMiddleware = require("../middleware/authenticate");
const authController = require("../controller/auth-controller");
const productController = require("../controller/product-controller");
const uploadMiddleware = require("../middleware/upload");

const router = express.Router();

router.get("/product", authenticateMiddleware, authController.getMe);
router.post(
  "/create",
  authenticateMiddleware,
  uploadMiddleware.single("image"),
  productController.createProduct
);

module.exports = router;
