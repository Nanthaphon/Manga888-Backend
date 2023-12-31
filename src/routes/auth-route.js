const express = require("express");
const authController = require("../controller/auth-controller");
const authenticateMiddleware = require("../middleware/authenticate");
const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/me", authenticateMiddleware, authController.getMe);
router.post("/me/cart", authenticateMiddleware, authController.cart);
router.get("/getCart", authenticateMiddleware, authController.getCart);
module.exports = router;
