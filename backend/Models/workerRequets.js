const mongoose = require("mongoose");

const WorkerRequestSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      unique: true,
      ref: "user",
    },
    city: {
      type: String,
      required: true,
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

  { timestamps: true }
);

const workerRequests = mongoose.model("Worker_Request", WorkerRequestSchema);

module.exports = workerRequests;
