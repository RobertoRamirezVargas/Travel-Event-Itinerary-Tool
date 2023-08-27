const express = require("express");
const router = express.Router();
const { getEvents } = require("../ServicesApis/TicketMasterServices");

router.get("/events", async (req, res) => {
  const location = req.query.location;

  try {
    const events = await getEvents(location);
    res.status(200).json(events);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal srver error" });
  }
});

module.exports = router;
