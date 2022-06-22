const express = require("express");
const router = express.Router();
const productModel = require("../Models/productModel");
const storeModel = require("../Models/storeModel");
const sellerModel = require("../Models/sellerModel");
const mongoose = require("mongoose");

router.post("/addProduct", (req, res) => {
  const data = req.body;
  console.log("Data ------------------------", data);
  const product = new productModel(data);
  product.save((err, data) => {
    console.log(err, data);
    if (err) {
      res.status(400).json({ message: err });
    } else {
      console.log("Product Data", data.products, "____", data._id);
      var productId = data._id.toString();
      storeModel.findByIdAndUpdate(
        data.store,
        {
          $push: {
            products: productId,
          },
        },
        (err, data) => {
          console.log("Error", err, data, data);
        }
      );
      res.status(200).json(data);
    }
  });

  // productModel.insertMany(data, (err, data) => {
  //   if (err) throw err;
  //   else {
  //     console.log("Data", data);
  //     res.status("200").send(data);
  //   }
  // });
});

router.get("/getProducts", (req, res) => {
  productModel.find({}, (err, data) => {
    if (err) throw err;
    else {
      res.status("201").send(data);
    }
  });
});

router.post("/searchProduct", (req, res) => {
  const { keyword } = req.body;
  console.log("req search", keyword);
  productModel.find(
    { name: { $regex: keyword, $options: "i" } },
    (err, data) => {
      if (err) throw err;
      else {
        console.log("Data", data);
        res.send(data);
      }
    }
  );
});

router.get("/getProduct/:id", async (req, res) => {
  const id = req.params.id;
  const productData = await productModel.findById(id).populate("store");
  res.status(200).send(productData);
});

router.get("/getSellerProducts/:sellerId", (req, res) => {
  console.log(req.params);
  const { sellerId } = req.params;
  productModel.find({ seller: sellerId }, (err, data) => {
    if (err) throw err;
    console.log(`Data/: ${data}`);
    res.status("200").send(data);
  });
});

router.put("/updateProduct/:productId", (req, res) => {
  console.log("0--------------------------------------=======-------------");
  console.log(req.params, req.body);
  const data = req.body;
  const { productId } = req.params;
  productModel.findByIdAndUpdate(productId, data, (err, data) => {
    if (err) throw err;
    console.log(`Data/: ${data}`);
    res.status("200").send(data);
  });
});

router.delete("/delete/:productId", (req, res) => {
  const { productId } = req.params;
  productModel.findByIdAndDelete(productId, async (err, data) => {
    if (err) {
      res.status(400).json({ message: err });
    } else {
      const storeResponse = await storeModel.updateMany(
        {},
        { $pull: { products: productId } }
      );
      console.log("Store Response", storeResponse);
      const sellerResponse = await sellerModel.updateMany(
        {},
        { $pull: { products: productId } }
      );
      console.log("Store Response", sellerResponse);
      res.status(200).json(data);
    }
  });
});

module.exports = router;
