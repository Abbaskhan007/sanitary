const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      unique: true,
      ref: "user",
    },
    workerRequests: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          require: true,
          unique: true,
          ref: "user",
        },
        description: {
          type: String,
          require: true,
        },
        price: {
          type: Number,
          require: true,
        },
        categories: {
          type: [String],
          require: true,
        },
        images: [String],
      },
    ],
    sellerRequests: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          require: true,
          unique: true,
          ref: "user",
        },
        description: {
          type: String,
          require: true,
        },
        categories: {
          type: [String],
          require: true,
        },
      },
    ],
    blockUsers: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
        },
      },
    ],
  },
  { timestamps: true }
);

const adminModel = mongoose.model("admin", adminSchema);

module.exports = adminModel;
