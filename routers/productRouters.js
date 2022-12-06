const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");

router.post("/createProduct", productController.createNewProduct);

module.exports = router;
