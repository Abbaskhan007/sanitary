const mongoose = require("mongoose");

const WorkerSchema = mongoose.Schema(
  {
    worker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    category: [
      {
        type: String,
        require: true,
      },
    ],
    description: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    images: [{ type: String, require: true }],
    rating: {
      type: Number,
      default: 0,
    },
    projectsCompleted: {
      type: Number,
      default: 0,
    },
    projectCancelled: {
      type: Number,
      default: 0,
    },
    feedback: [
      {
        message: String,
        user: {
          type: mongoose.Types.ObjectId,
          ref: "user",
        },
      },
    ],
  },
  { timestamps: true }
);

const workerModel = mongoose.model("Worker", WorkerSchema);

module.exports = workerModel;
