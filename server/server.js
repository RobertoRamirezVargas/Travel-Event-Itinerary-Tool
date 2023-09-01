"use strict";

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const jwt = require("jsonwebtoken");
const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();
const { MONGO_URI } = process.env;

const PORT = process.env.PORT || 8000;

app.use(morgan("tiny"));
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* MongoDB */
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const dbFunction = async (VTP) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db(VTP);
    console.log("Connected to DataBase successfully!");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  } finally {
    await client.close();
  }
};
/* MongoDB */

// Routes
app.use(require("./Routes/authentification"));
app.use(require("./Routes/getitinerary"));
app.use(require("./Routes/weather"));
app.use(require("./Routes/restaurants"));
app.use(require("./Routes/events"));
app.use(require("./Routes/saveItinerary"));

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error("Global error handler:", err);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, async () => {
  try {
    await dbFunction("VTP");
    console.log(`Server listening on Port ${PORT}`);
  } catch (error) {
    console.error("Error connecting to Database", error);
  }
});
