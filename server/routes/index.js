const express = require('express');
const router = express.Router();
const items = require('./items');

// Here we can add another set of routes like items with a prefix
router.use('/items', items);

module.exports = router;