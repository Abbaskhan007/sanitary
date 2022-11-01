require("dotenv").config();
const express = require("express");
const productRouter = require("./Routers/productRouter");
const userRouter = require("./Routers/userRouter");
const cartRouter = require("./Routers/cartRouter");
const mongoose = require("mongoose");
const sellerRouter = require("./Routers/sellerRouter");
const storeRouter = require("./Routers/storeRouter");
const workerRouter = require("./Routers/workerRouter");
const workerRequestRouter = require("./Routers/workerRequestRouter");
const sellerRequestRouter = require("./Routers/sellerRequestRouter");
const categoryRouter = require("./Routers/categoryRouter");
const workerCategoriesRouter = require("./Routers/workerCategoriesRouter");
const shippingRouter = require("./Routers/shippingAddressRouter");
const orderRouter = require("./Routers/orderRouter");
const bannerModel = require("./Models/bannerModel");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

console.log("PROCESS--", process.env.STRIPE_SECRET_KEY);

mongoose
  .connect("mongodb://localhost/sanitary", { useNewUrlParser: true })
  .then(() => console.log("Connected to mongodb"));

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  console.log("yes reciev");
});

app.get("/", (req, res) => {
  res.send("Server running");
});

app.get("/api/config", (req, res) => {
  console.log("__________________________________");
  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
});

app.get("/api/banners", async (req, res) => {
  try {
    const banners = await bannerModel.find();
    res.status(200).json(banners);
  } catch (err) {
    res.status(401).send({ message: err.message });
  }
});

app.post("/api/pay", async (req, res) => {
  try {
    const orderData = req.body;
    console.log("Order Data", orderData);
    if (!orderData) {
      return res.status(500).send({ message: "Please make the order first" });
    }
    const paymentIntent = await stripe.paymentIntents.create({
      amount: parseFloat(orderData.amount).toFixed(2) * 100,
      payment_method_types: ["card"],
      metadata: orderData,
      currency: "PKR",
    });
    const clientSecret = paymentIntent.client_secret;
    res.status(200).json({ message: "Payment Initiated", clientSecret });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

app.use("/api/categories", categoryRouter);
app.use("/api/workerCategories", workerCategoriesRouter);
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/seller", sellerRouter);
app.use("/api/stores", storeRouter);
app.use("/api/worker", workerRouter);
app.use("/api/workerRequests", workerRequestRouter);
app.use("/api/sellerRequests", sellerRequestRouter);
app.use("/api/orders", orderRouter);
app.use("/api/shippingAddress", shippingRouter);
app.listen(5000, () => console.log("Server running at port 5000"));
