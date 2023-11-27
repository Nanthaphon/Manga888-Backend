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
        // amount: +data.amount,
        // userId: +req.body.userId,
        order_date: new Date(),
        delivery_date: new Date(),
        userId: +req.user.id,
      },
    });
    const orderItem = await prisma.order_item.create({
      data: {
        amount: +data.amount,
        orderId: order.id,
        productId: +data.productId,
      },
    });
    res.end();
  } catch (error) {
    next(error);
  }
};

exports.getOrderByUser = async (req, res, next) => {
  try {
    const result = await prisma.order.findMany({
      where: {
        userId: req.user.id,
      },
      include: {
        Order_item: {
          include: { product: true },
        },
      },
    });
    console.log(result);

    const product = result.map((el) => ({
      name: el.Order_item[0].product.name,
      image: el.Order_item[0].product.image,
      price: el.Order_item[0].product.price,
      id: el.Order_item[0].product.id,
    }));
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};
