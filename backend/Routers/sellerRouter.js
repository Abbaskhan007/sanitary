const express = require("express");
const sellerModel = require("../Models/sellerModel");
const sellerRouter = express.Router();

sellerRouter.post("/createSeller", async (req, res) => {
  const sellerData = req.body;

  const checkSeller = await sellerModel.findOne({ user: sellerData.user });
  console.log("//////", sellerData, "////", checkSeller);
  if (checkSeller) {
    res.send({ message: "The user is already the customer" });
  } else {
    const seller = new sellerModel(sellerData);
    seller.save((err, data) => {
      if (err) throw err;
      res.send(data);
    });
  }
});

module.exports = sellerRouter;
