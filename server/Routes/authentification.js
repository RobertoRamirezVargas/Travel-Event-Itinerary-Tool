const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { json } = require("body-parser");
const { MongoClient } = require("mongodb");
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("VTP");
    const usersCollection = db.collection("Users");

    //Check for existing email

    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      console.log("Email Already Registered:", existingUser.email);
      return res.status(400).json({ message: " Email already registered" });
    }

    //Create New Password

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    //Create New User
    const newUser = new User(username, email, passwordHash);
    console.log("New user object:", newUser);

    //Save the user to the database
    await usersCollection.insertOne(newUser);
    console.log("User Registered Successfully:", newUser.email);
    return res.status(201).json({
      message: "User registered succesfully!",
      user: { username: newUser.username, email: newUser.email },
    });
    console.log("User registered Succesfully:", newUser);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("VTP");
    const usersCollection = db.collection("Users");
    //Find the user by email
    const user = await usersCollection.findOne({ email });
    console.log(user);
    if (user) {
      // Compare the password
      const passwordMatch = await bcrypt.compare(password, user.passwordHash);

      if (passwordMatch) {
        const token = jwt.sign({ email: user.email }, "secret111197");
        return res.status(200).json({
          message: "Welcome Back!",
          token,
          user: { username: user.username, email: user.email },
        });
      } else {
        return res.status(401).json({ message: "Invalid credentials" });
      }
    } else {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
