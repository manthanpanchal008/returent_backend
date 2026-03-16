const mongoose = require("mongoose");

// Schema for user accounts
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },      // Full name
  username: { type: String, required: true },  // Username
  email: { type: String, required: true },     // Email address
  phone: { type: String, required: true },     // Phone number
  password: { type: String, required: true },  // Hashed password
});

const userModel = mongoose.model('user', userSchema);

module.exports = userModel; // Export model for use in controllers