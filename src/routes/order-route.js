const express = require("express");
const authenticateMiddleware = require("../middleware/authenticate");
const upload = require("../middleware/upload");
const orderController = require("../controller/order-controller");
const router = express.Router();

router.post(
  "/checkout",
  authenticateMiddleware,
  upload.single("slipImageUrl"),
  orderController.checkout
);
router.get(
  "/getOrderByUser",
  authenticateMiddleware,
  orderController.getOrderByUser
);
module.exports = router;
