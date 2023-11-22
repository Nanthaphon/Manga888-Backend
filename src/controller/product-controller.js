const { upload } = require("../utils/cloundinary-service");
const prisma = require("../models/prisma");
const createError = require("../utils/create-error");
const fs = require("fs");

exports.createProduct = async (req, res, next) => {
  try {
    const { price, name, description } = req.body;
    console.log(price, name, description);
    let image;
    if (!req.file) {
      return next(createError("message or image is required", 400));
    }
    if (req.file) {
      image = await upload(req.file.path);
    }
    const newProduct = await prisma.product.create({
      data: {
        price: +price,
        name: name,
        description: description,
        image: image,
      },
    });

    res.status(201).json({ newProduct });
  } catch (error) {
    next(error);
  }
  // finally {
  //   if (req.file) {
  //     fs.unlink(req.file.path);
  //   }
  // }
};

exports.getAll = async (req, res, next) => {
  try {
    const findProduct = await prisma.product.findMany({});
    res.status(201).json({ findProduct });
  } catch (error) {
    next(error);
  }
};

exports.viewProductById = async (req, res, next) => {
  try {
    const target = req.params.productId;
    // console.log(target);
    const findProduct = await prisma.product.findFirst({
      where: {
        id: +target,
      },
    });
    console.log(findProduct);

    res.status(201).json({ findProduct });
  } catch (error) {
    next(error);
  }
};
