const axios = require("axios");

const getRestaurants = async (location, term) => {
  const apiKey = process.env.YELP_API_KEY;
  const apiUrl = "https://api.yelp.com/v3/businesses/search";

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      params: {
        location,
        term,
      },
    });
    return response.data.businesses;
  } catch (error) {
    console.error("Error fetching directions", error);
    throw error;
  }
};
module.exports = { getRestaurants };
