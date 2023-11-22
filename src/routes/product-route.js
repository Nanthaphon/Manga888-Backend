const express = require("express");
const authenticateMiddleware = require("../middleware/authenticate");

const productController = require("../controller/product-controller");
const uploadMiddleware = require("../middleware/upload");

const router = express.Router();

router.post(
  "/create",
  authenticateMiddleware,
  uploadMiddleware.single("image"),
  productController.createProduct
);

router.get("/getAll", productController.getAll);

module.exports = router;
