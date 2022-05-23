const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    images: [
      {
        type: String,
        require,
      },
    ],
    store: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Stores",
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
      require: true,
    },
    inStock: {
      type: Number,
      require: true,
    },
    shippingPrice: {
      type: Number,
      default: 0,
    },
  },
  { timeStamps: true }
);

const productModel = mongoose.model("Product", productSchema);

module.exports = productModel;
