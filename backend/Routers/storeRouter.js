const express = require("express");
const productModel = require("../Models/productModel");
const sellerModel = require("../Models/sellerModel");

const storeModel = require("../Models/storeModel");
const storeRouter = express.Router();

storeRouter.post("/createStore", async (req, res) => {
  const storeData = req.body;

  console.log("//////", storeData);

  const store = new storeModel(storeData);
  store.save((err, data) => {
    if (err) throw err;
    res.status(200).json(data);
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

storeRouter.get("/getStores/:seller", async (req, res) => {
  const { seller } = req.params;
  const stores = await storeModel.find({ seller }).populate("seller");
  res.status(200).json(stores);
});

storeRouter.delete("/deleteStore/:storeId", async (req, res) => {
  console.log("Stores--------------______");
  const { storeId } = req.params;
  storeModel.findByIdAndRemove(storeId, async (err, data) => {
    console.log("Data-------------", data);
    if (err) {
      res.status(400).json({ message: err });
    } else {
      const sellerStore = await sellerModel.findByIdAndUpdate(data.seller, {
        $pull: { store: storeId },
      });
      console.log("Seller Store-------------", sellerStore);
      const products = await productModel.deleteMany({ _id: data.products });
      const stores = await storeModel.find({ seller: req.body.sellerId });
      console.log("products--------------------", products);
      console.log("Stores--------------------", stores);
      res.status(200).json(stores);
    }
  });
});

storeRouter.put("/updateStore", async (req, res) => {
  const updatedStore = await storeModel.findByIdAndUpdate(
    req.body._id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedStore);
});

module.exports = storeRouter;
