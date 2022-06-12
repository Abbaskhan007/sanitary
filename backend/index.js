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

app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/seller", sellerRouter);
app.use("/api/stores", storeRouter);
app.use("/api/worker", workerRouter);
app.use("/api/workerRequests", workerRequestRouter);
app.use("/api/sellerRequests", sellerRequestRouter);
app.listen(5000, () => console.log("Server running at port 5000"));
