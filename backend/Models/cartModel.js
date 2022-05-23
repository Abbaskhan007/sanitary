const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      require: true,
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          require: true,
        },
        quantity: {
          type: Number,
          require: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const cartModel = mongoose.model("cart", cartSchema);

module.exports = cartModel;
