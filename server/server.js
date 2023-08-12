"use strict";

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const mongodb = require("mongodb");

const PORT = 8000; //PORT

app.use(morgan("tiny"));
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require("dotenv").config(); // .env

/*MONGOOSE*/
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to the database.");
});

/*MONGOOSE*/
app.use(require("./Routes/routes"));

app.listen(PORT, () => {
  console.log(`Server listening on Port ${PORT}`);
});
