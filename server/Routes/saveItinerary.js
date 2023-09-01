const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { MongoClient } = require("mongodb");
const Itinerary = require("../models/itineraryModel");
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    console.log("token not found");
    return res.sendStatus(401);
  }

  jwt.verify(token, "secret111197", (err, user) => {
    if (err) {
      console.log(err);
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
};

router.post("/saveItinerary", authenticateToken, async (req, res) => {
  let client;

  try {
    const userId = req.user;
    const { selectedEvents, selectedRestaurants } = req.body;

    const itinerary = new Itinerary(
      userId,
      selectedEvents,
      selectedRestaurants
    );

    client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("VTP");
    const itineraryCollection = db.collection("Itineraries");
    console.log("connected to db");
    await itineraryCollection.insertOne(itinerary);

    return res.status(200).json({ message: "Itinerary saved successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  } finally {
    if (client) {
      client.close();
    }
  }
});

module.exports = router;
