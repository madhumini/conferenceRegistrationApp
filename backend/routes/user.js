const express = require('express');
const router = express.Router();
const User = require('../models/User')

router.get("/getRegistrationDetails/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id).sort({ createdAt: -1 });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
