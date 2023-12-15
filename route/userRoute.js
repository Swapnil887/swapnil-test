const express = require("express");
const User = require("../model/userModel");
const mongoose = require("mongoose");
const userRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userController = require("../controller/userController");

userRouter.get("/", async (req, res) => {
  res.send("users");
});

userRouter.post("/register", userController.registerUser);

userRouter.post("/login", userController.loginUser);
module.exports = userRouter;
