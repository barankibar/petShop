const asyncHandler = require("express-async-handler");

const fs = require("fs");
const path = require("path");

const Product = require("../models/ProductModel");

const baseUrl = "http://localhost:8080/productImages/";

const addProductPage = (req, res) => {
  res.render("addProduct");
};

  const getAllProducts = asyncHandler(async (req, res) => {
    try {
      const products = await Product.find({});

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

    let uploadImage = req.files.img;
    let uploadPath = path.join(
      __dirname,
      "..",
      "public",
      "uploads",
      uploadImage.name
    );
    console.log(uploadPath);

    uploadImage.mv(
      uploadPath,
      asyncHandler(async () => {
        await Product.create({
          image: "/uploads/" + uploadImage.name,
          ...req.body,
        });
        res.redirect("/");
      })
    );

    // await Product.create({
    //   title: req.body.title,
    //   price: req.body.price,
    // });
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
  addProductPage,
};
