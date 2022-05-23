const express = require("express");

const storeModel = require("../Models/storeModel");
const storeRouter = express.Router();

storeRouter.post("/createStore", async (req, res) => {
  const storeData = req.body;

  console.log("//////", storeData);

  const store = new storeModel(storeData);
  store.save((err, data) => {
    if (err) throw err;
    res.send(data);
  });
});

storeRouter.get("/getStores", async (req, res) => {
  const storeData = await storeModel.find({}).populate("seller");
  console.log("store data", storeData);
  res.send(storeData);
});

storeRouter.get("/getStore/:storeId", async (req, res) => {
  const { storeId } = req.params;
  const store = await storeModel
    .findById(storeId)
    .populate("seller")
    .populate({ path: "seller", populate: { path: "user", model: "user" } })
    .populate("products")
    .populate("products.reviews.user");
  if (!store) {
    res.send({ message: "Store does not exist" });
  } else {
    console.log("Store", store);
    res.send(store);
  }
});

module.exports = storeRouter;
