/***
 * 
 * 
 * 
 * 
 * 
 * This file provides the code of login and signup pages
 * 
 * 
 * 
 */





const express = require("express");
const nodemailer = require("nodemailer");
require('dotenv').config();
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middlewares/fetchuser");

//creating a user
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Enter a valid password").isLength({ min: 6 }),
  ],
  async (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        res.status(400).send("You are already signed up");
      } else {
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        user = User.create({
          name: req.body.name,
          password: secPass,
          email: req.body.email,
        });
        let data = {
          user: {
            id: user.id,
          },
        };
        let authtoken = jwt.sign(data, process.env.JWT_SECRET);

        return res.status(200).json({ authtoken });
      }
    } else res.send({ errors: result.array() });
  }
);

//login the user
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "The password must be of 5 chararcters").notEmpty(),
  ],
  async (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
      let user = await User.findOne({ email: req.body.email });
      try {
        if (!user) {
          res.status(400).send("Invalid credentials");
        } else {
          let passwordCompare = bcrypt.compare(
            req.body.password,
            user.password
          );
          if (passwordCompare) {
            let data = {
              user: {
                id: user.id,
              },
            };
            let authtoken = jwt.sign(data, process.env.JWT_SECRET);

            return res.status(200).json({ authtoken });
          } else {
            return res
              .status(400)
              .send({ message: "The entered password is wrong" });
          }
        }
      } catch (err) {
        console.error({ message: err.message });
        return res.status(500).send("Internal server error");
      }
    }
  }
);

//fetch the user
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    let userId = req.user.id;
    let user = await User.findById(userId).select("-password");
    return res.send(user);
  } catch (err) {
    console.error({ message: err.message });
    return res.status(500).send("Internal server error");
  }
});

module.exports = router;