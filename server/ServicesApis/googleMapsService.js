const axios = require("axios");

const getDirections = async (origin, destination) => {
  const apiUrl = "";

  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error("Error fetching directions", error);
    throw error;
  }
};
module.exports = { getDirections };
