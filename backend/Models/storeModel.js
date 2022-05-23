const mongoose = require("mongoose");

const storeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    category: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    image: {
      type: String,
      require: true,
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seller",
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    rating: {
      type: Number,
      default: 0,
    },
    orderDelivered: {
      type: Number,
      default: 0,
    },
    orderCancelled: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const storeModel = mongoose.model("Store", storeSchema);

module.exports = storeModel;
