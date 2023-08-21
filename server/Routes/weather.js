const express = require("express");
const router = express.Router();
const { getWeather } = require("../ServicesApis/OwMapServices");

router.get("/weather", async (req, res) => {
  const cityName = req.query.cityName;

  try {
    const weatherData = await getWeather(cityName);
    res.status(200).json(weatherData);
  } catch (error) {
    console.error("Error fetching weather", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
