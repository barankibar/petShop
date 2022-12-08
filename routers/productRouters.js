const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");

router.get("/createProduct", productController.addProductPage);
router.post("/createProduct", productController.createNewProduct);

module.exports = router;
