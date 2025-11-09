const express = require('express');
const router = express.Router();
const authenticate = require('../authenticate');
const UserDetails = require('../models/userDetails');

// POST /create-user
// Body: { uid?: string, name?: string }
// If uid is not provided, try to get it from req.user (set by authenticate middleware)
router.post('/create-user', authenticate, async (req, res) => {
  try {
    // Only accept uid and name from request body per API contract
    const { uid, name } = req.body || {};

    if (!uid) {
      return res.status(400).json({ ok: false, message: 'Missing uid in request body' });
    }


    // Check if user already exists
    const existing = await UserDetails.findOne({ uid }).exec();
    if (existing) {
      return res.status(200).json({ ok: true, message: 'User already exists' });
    }

    // Create new user
    const newUser = new UserDetails({
      uid,
      name: name || '',
      chats: [],
    });

    await newUser.save();

    return res.status(201).json({ ok: true, message: 'User created', user: { uid: newUser.uid, name: newUser.name } });
  } catch (err) {
    console.error('Error in /create-user:', err);
    return res.status(500).json({ ok: false, message: 'Internal server error' });
  }
});

module.exports = router;
