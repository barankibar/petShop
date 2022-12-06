const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");

const fs = require("fs");
const path = require("path");

const Product = require("../models/ProductModel");

const baseUrl = "http://localhost:8080/productImages/";

const getAllProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({});
    console.log(products);

    res.status(200).render("index", {
      products,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      err,
    });
  }
});

const createNewProduct = asyncHandler(async (req, res) => {
  try {
    const uploadDir = "public/uploads";
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }

    let uploadImage = req.files.image;
    let uploadPath = __dirname + "/public/uploads/" + uploadImage.title;

    uploadImage.mv(uploadPath, async () => {
      await Product.create({
        ...req.body,
        image: "/uploads/" + uploadImage.name,
      });

      res.status(201).redirect("/");
    });

    await Product.create({
      title: req.body.title,
      price: req.body.price,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      err,
    });
  }
});
module.exports = {
  getAllProducts,
  createNewProduct,
};
