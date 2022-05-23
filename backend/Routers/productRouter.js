const express = require("express");
const router = express.Router();
const productModel = require("../Models/productModel");
const data = require("../data");

router.get("/addProduct", (req, res) => {
  productModel.insertMany(data, (err, data) => {
    if (err) throw err;
    else {
      console.log("Data", data);
      res.status("200").send(data);
    }
  });
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
    { name: { $regex: keyword, "$options": "i" } },
    (err, data) => {
      if (err) throw err;
      else {
        console.log("Data", data);
        res.send(data);
      }
    }
  );
});

router.get("/getProduct/:id", (req, res) => {
  const id = req.params.id;
  productModel.findById(id, (err, data) => {
    if (err) throw err;
    console.log(`Data/${id}: ${data}`);
    res.status("200").send(data);
  });
});

module.exports = router;
