const axios = require("axios");

const getEvents = async (location) => {
  const apiKey = process.env.TICKETMASTER_API_KEY;
  const apiUrl = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}`;

  try {
    const response = await axios.get(apiUrl, {
      params: {
        size: 10,
        apikey: apiKey,
        city: location,
      },
    });

    return response.data._embedded.events;
  } catch (error) {
    console.error("Error fetching events", error);
    throw error;
  }
};

module.exports = { getEvents };
