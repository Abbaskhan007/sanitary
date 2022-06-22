const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    category: [{ type: String, required: true }],
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sellers",
      required: true,
    },

    store: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
      required: true,
    },
    rating: {
      type: Number,
    },
    numRating: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
        },
        message: String,
      },
    ],
    price: {
      type: Number,
      required: true,
    },
    inStock: {
      type: Number,
      required: true,
    },
    shippingPrice: {
      type: Number,
      required: true,
    },
  },
  { timeStamps: true }
);

const productModel = mongoose.model("Product", productSchema);

module.exports = productModel;
