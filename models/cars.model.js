const mongoose = require("mongoose");

// Define the schema
const carSchema = new mongoose.Schema({
  brand: { type: String, required: true },
  model: { type: String, required: true },
  price: { type: Number, required: true },
  seats: { type: Number, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  isAc: { type: Boolean, default: true },
  rating: { type: Number, default: 10 },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
});

// Create the model
const Car = mongoose.model("Car", carSchema);

module.exports = Car;
