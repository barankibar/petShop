const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  image: String,
  title: String,
  price: Number,
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
