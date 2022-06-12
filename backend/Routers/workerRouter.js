const express = require("express");
const userModel = require("../Models/userModels");
const workerModel = require("../Models/workerModel");
const workerRouter = express.Router();

workerRouter.post("/createWorker", async (req, res) => {
  const worker = new workerModel(req.body);
  worker.save((err, data) => {
    if (err) throw err;
    res.send(data);
  });
});

workerRouter.get("/getWorkers/:workerId", async (req, res) => {
  const { workerId } = req.params;
  const worker  = await workerModel.findById(workerId).populate("user").populate("feedback.user");
  if (!worker) {
    res.send({ message: "Worker not found" });
  } else {
    console.log("Worker", worker)
    res.send(worker);
  }
});

workerRouter.get("/getWorkers", async (req, res) => {
  const worker = await workerModel.find({});
  res.send(worker);
});

module.exports = workerRouter;
