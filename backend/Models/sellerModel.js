const mongoose = require("mongoose");

const sellerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    category: { type: String, require: true },
    store: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Store",
      },
    ],
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    rating: { type: Number, default: 0 },
    orderDelivered: {
      type: Number,
      default: 0,
    },
    orderCancelled: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const sellerModel = mongoose.model("Seller", sellerSchema);
module.exports = sellerModel;
