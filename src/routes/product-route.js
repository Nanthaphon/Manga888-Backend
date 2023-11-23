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

router.delete("/deleteProduct/:ProductId", productController.deleteProductById);

router.get("/getAll", productController.getAll);

router.get("/getAllAdmin", productController.getAllAdmin);

router.get("/viewProductById/:productId", productController.viewProductById);

router.patch(
  "/editproduct/:productId",
  uploadMiddleware.single("image"),
  productController.EditProduct
);

module.exports = router;
