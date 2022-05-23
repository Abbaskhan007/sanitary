const express = require("express");
const userModel = require("../Models/userModels");
const bcrypt = require("bcrypt");
const generateToken = require("../utils");
const router = express.Router();

router.post("/registeration", async (req, res) => {
  const { name, email, password } = req.body;
  const checkUser = await userModel.findOne({ email });
  console.log("Check user");
  if (checkUser) {
    res.send({ message: "User with the same Email already exist" });
    return;
  } else {
    console.log("Body", name, email, password);
    const hashPassword = bcrypt.hashSync(password, 10);
    const user = new userModel({ name, email, password: hashPassword });
    user.save((err, user) => {
      console.log("user", user);
      if (err) {
        res.send({ message: err.message });
      }
      const token = generateToken(user);
      console.log("Token", token);
      res.status(200).send({
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          profileImage: user.profileImage,
          phoneNumber: user.phoneNumber,
          isAdmin: user.isAdmin,
          isSeller: user.isSeller,
          isWorker: user.isWorker,
          token,
        },
      });
    });
  }
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  console.log("Body:", email, password);
  userModel.findOne({ email: email }, (err, user) => {
    if (err) {
      throw err;
    }
    if (user) {
      if (bcrypt.compare(password, user.password)) {
        const token = generateToken(user);
        console.log("Token", token);
        res.send({
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            profileImage: user.profileImage,
            phoneNumber: user.phoneNumber,
            isAdmin: user.isAdmin,
            isSeller: user.isSeller,
            isWorker: user.isWorker,
            token,
          },
        });
      }
    } else {
      res.send({ message: "Invalid email or password" });
    }
  });
});

module.exports = router;
