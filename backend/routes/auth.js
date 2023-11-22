// routes/registration.js
const express = require('express');
const router = express.Router();
const User = require('../models/User')
// Registration endpoint
router.post('/register', async (req, res) => {
  try {
    const { name, email, registrationType, attendees } = req.body;

    // Validate if registrationType is 'group', attendees should be provided and not empty
    if (registrationType === 'group' && (!attendees || attendees.length === 0)) {
      return res.status(400).json({ error: 'Attendees array is required for group registration.' });
    }

    const user = new User({
      name,
      email,
      registrationType,
      attendees,
    });

    // Save the user to the database
    await user.save();

    res.status(201).json({user});
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
    console.log(error)
  }
});

module.exports = router;
