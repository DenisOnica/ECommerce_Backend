const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: String,
    price: Number,
    imageURL: String,
    description: String,
    reviews: [
      {
        name: { type: String },
        comment: { type: String },
      },
    ],
    addToCartCount: { type: Number, default: 0 },
    buyCount: { type: Number, default: 0 },
    purchaseCount: { type: Number, default: 0 },
  },
  { strict: false }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
