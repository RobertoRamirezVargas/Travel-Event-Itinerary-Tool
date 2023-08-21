const express = require("express");
const router = express.Router();
const { getRestaurants } = require("../ServicesApis/YelpServices");

router.get("/restaurants", async (req, res) => {
  const location = req.query.location;
  const term = req.query.term;

  try {
    const restaurants = await getRestaurants(location, term);
    res.status(200).json(restaurants);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
