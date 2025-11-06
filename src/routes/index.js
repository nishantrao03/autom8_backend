const express = require('express');
const router = express.Router();

// Define a sample route
router.get('/', (req, res) => {
    res.send('Welcome to the Autom8 Backend!');
});

// Export the router
module.exports = router;