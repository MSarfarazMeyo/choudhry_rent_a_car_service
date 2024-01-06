const mongoose = require("mongoose");

const contactInfoSchema = new mongoose.Schema({
  address: { type: String, required: true },
  phone: { type: String, required: true },
  whatsapp: { type: String, required: true },
  email: { type: String, required: true },
  location: { type: String, required: true },
});

const ContactInfo = mongoose.model("ContactInfo", contactInfoSchema);

module.exports = ContactInfo;
