const express = require('express');
const router = express.Router();
const authenticate = require('../authenticate');

// Define a sample route
router.get('/', authenticate, async (req, res) => {
    res.send('Welcome to the Autom8 Backend!');
});

// Export the router
module.exports = router;