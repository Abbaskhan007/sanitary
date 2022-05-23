const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require,
    },
    profileImage: {
      type: String,
    },
    phoneNumber: {
      type: Number,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isSeller: {
      type: Boolean,
      default: false,
    },
    isWorker: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
