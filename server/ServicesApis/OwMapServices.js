const axios = require("axios");

const getWeather = async (cityName) => {
  const apiKey = process.env.OPENWEATHERMAP_API_KEY;
  const apiUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&country=CA&appid=${apiKey}`;

  try {
    const response = await axios.get(apiUrl);

    if (response.data.list && response.data.list.length > 0) {
      const weatherData = response.data.list[0];
      return weatherData;
    } else {
      throw new Error("Weather data not available.");
    }
  } catch (error) {
    console.error("Error fetching weather", error);
    throw error;
  }
};
module.exports = { getWeather };
