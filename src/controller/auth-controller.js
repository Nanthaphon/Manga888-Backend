const { registerSchema, loginSchema } = require("../validators/auth-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const prisma = require("../models/prisma");

exports.register = async (req, res, next) => {
  try {
    const { value, error } = registerSchema.validate(req.body);
    if (error) {
      return next(error);
    }
    value.password = await bcrypt.hash(value.password, 12);
    const user = await prisma.user.create({
      data: value,
    });
    const payload = { userId: user.id };
    const accessToken = jwt.sign(
      payload,
      process.env.JWT_SECRET_KEY || "abcdefg",
      { expiresIn: process.env.JWT_EXPIRE }
    );

    res.status(201).json({ accessToken, user });
  } catch (error) {
    next(error);
  }
};
exports.login = async (req, res, next) => {
  try {
    const { value, error } = loginSchema.validate(req.body);
    if (error) {
      return next(error);
    }
    const user = await prisma.user.findFirst({
      where: { email: value.email },
    });
    if (!user) {
      return next(createError("email or password is invalid", 400));
    }

    const isMatch = await bcrypt.compare(value.password, user.password);
    if (!isMatch) {
      return next(createError("password is มีปัญหาน่ะจะ", 400));
    }
    const payload = { userId: user.id };
    const accessToken = jwt.sign(
      payload,
      process.env.JWT_SECRET_KEY || "sldjfslfjk",
      { expiresIn: process.env.JWT_EXPIRE }
    );
    delete user.password;
    res.status(200).json({ accessToken, user });
  } catch (error) {
    next(error);
  }
};

exports.getMe = (req, res) => {
  res.status(200).json({ user: req.user });
};

exports.cart = async (req, res, next) => {
  try {
    const user = req.user.id;
    console.log(user);
    const data = req.body;
    console.log(data);
    const cart = await prisma.cart.create({
      data: {
        userId: user,
        amount: +data.amount,
        productId: +data.productId,
      },
    });
    console.log(cart);

    res.status(200).json({ msg: "ok" });
  } catch (error) {
    next(error);
  }
};

exports.getCart = async (req, res, next) => {
  try {
    const findProduct = req.user.id;
    const getCartProduct = await prisma.cart.findFirst({
      where: {
        userId: +findProduct,
      },
      include: {
        product: true,
      },
    });

    // console.log(getCartProduct);

    res.status(201).json({ getCartProduct });
  } catch (error) {
    next(error);
  }
};
