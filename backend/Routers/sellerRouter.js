const express = require("express");
const sellerModel = require("../Models/sellerModel");
const sellerRouter = express.Router();

sellerRouter.post("/createSeller", async (req, res) => {
  const sellerData = req.body;

  const checkSeller = await sellerModel.findOne({ user: sellerData.user });
  console.log("//////", sellerData, "////", checkSeller);
  if (checkSeller) {
    res.status(469).send({ message: "The user is already the seller" });
  } else {
    const seller = new sellerModel(sellerData);
    seller.save((err, data) => {
      if (err) throw err;
      res.send(data);
    });
  }
});

module.exports = sellerRouter;
