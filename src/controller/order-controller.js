const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const prisma = require("../models/prisma");
const { upload } = require("../utils/cloundinary-service");
const { date } = require("joi");

module.exports.checkout = async (req, res, next) => {
  try {
    const data = req.body;
    console.log(data);
    const { path } = req.file;
    const imageUrl = await upload(path);

    const order = await prisma.order.create({
      data: {
        slipImageUrl: imageUrl,
        total_Price: +data.totalPrice,
        amount: +data.amount,
        // userId: +req.body.userId,
        order_date: new Date(),
        delivery_date: new Date(),
        userId: +req.user.id,
      },
    });
    const orderItem = await prisma.order_item.create({
      data: { orderId: order.id, productId: +req.body.productId },
    });
    res.end();
  } catch (error) {
    next(error);
  }
};
