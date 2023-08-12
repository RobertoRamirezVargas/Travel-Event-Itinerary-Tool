const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const { json } = require("body-parser");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    //Check for existing email

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: " Email already registered" });
    }

    //Create New Password

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    //Create New User
    const newUser = new User({
      username,
      email,
      passwordHash,
    });
    //Save the user to the database
    await newUser.save();

    return res.status(201).json({ message: "User resgistered succesfully!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    //Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credencials" });
    }
    //Compare the password
    const passwordMatch = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid Password" });
    }

    return res.status(200).json({ message: "Login succesfull" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
