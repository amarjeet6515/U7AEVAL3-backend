const { Router } = require("express");
var bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/User.model");
require("dotenv").config();

const userController = Router();


userController.post('/signup', async (req, res) => {
  const { name, email, password } = req.body
  const user = await UserModel.findOne({ email })
  if (user) {
      res.send("User already exist")
  } else {
      const hash_pass = bcrypt.hashSync(password, 6);
      const new_user = new UserModel({
          name,
          email,
          password: hash_pass,
      })
      await new_user.save();
      res.status(201).send("Signup Successfull")
  }

})

// login
userController.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email })
  if (!user) {
      res.status(204).send("Login First")
  }
  const hash = user.password;
  const chk_password = bcrypt.compareSync(password, hash);
  if (chk_password) {
      const token = jwt.sign({ userID: user._id }, process.env.MY_SECRET);
      res.json({ "msg": "login success",token })
  } else {
      res.status(400).send("Login Failed");
  }
})

module.exports = { userController };
