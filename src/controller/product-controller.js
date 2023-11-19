const upload = require("../middleware/upload");
const prisma = require("../models/prisma");
const createError = require("../utils/create-error");
const fs = require("fs");

exports.createProduct = async (req, res, next) => {
  try {
    const { price, name, description } = req.body;
    console.log("----------");
    let image;
    console.log(req.file, "file");
    if (!req.file) {
      return next(createError("message or image is required", 400));
    }
    console.log("first");
    console.log("first");
    if (req.file) {
      image = await upload(req.file.path);
    }

    const newProduct = await prisma.product.create({
      data: {
        price: price,
        name: name,
        description: description,
        image: image,
      },
    });
    console.log(newProduct, "WWWWW");
    res.status(201).json({ newProduct });
  } catch (error) {
    next(error);
  } finally {
    if (req.file) {
      fs.unlink(req.file.path);
    }
  }
};
