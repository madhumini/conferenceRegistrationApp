// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // Existing fields
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  // New field for registration type
  registrationType: {
    type: String,
    enum: ['single', 'group'],
    required: true,
  },
  // New field for group registration
  attendees: [{
    name: String,
    email: String,
  }],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
