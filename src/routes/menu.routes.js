const express = require('express');
const { additem, allitem } = require('../controller/menu.controller');
const upload = require('../middleware/upload');

const router = express.Router();

// Route to add a new menu item with image upload
router.post('/additem', upload.single("image"), additem);

// Route to get all menu items
router.get('/allitems', allitem);

module.exports = router; // Export router for use in app.js