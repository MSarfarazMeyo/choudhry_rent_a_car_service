const mongoose = require("mongoose");

const messagesSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
});

const message = mongoose.model("message", messagesSchema);

module.exports = message;
