const express = require("express");
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const { MongoClient } = require("mongodb");
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
const fetchItineraryFromDataBase = async (user) => {
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("VTP");
    const itineraryCollection = db.collection("Itineraries");

    const itinerary = await itineraryCollection.findOne({ user: user });
    await client.close();
    console.log("Fetched Itinerary:", itinerary);

    const selectedEvents =
      itinerary && itinerary.selectedEvents ? itinerary.selectedEvents : [];

    const selectedRestaurants =
      itinerary && itinerary.selectedRestaurants
        ? itinerary.selectedRestaurants
        : [];

    return {
      selectedEvents: selectedEvents,
      selectedRestaurants: selectedRestaurants,
    };
  } catch (error) {
    console.error("Error fetching itinerary:", error);
    throw error;
  }
};

router.get("/getItinerary", authenticateToken, async (req, res) => {
  try {
    const userId = req.user;
    const itineraryData = await fetchItineraryFromDataBase(userId);
    return res.status(200).json(itineraryData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
