const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  passwordHash: { type: String, required: true },
  country: { type: String, enum: ["Canada"], default: "Canada" },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
