const express = require('express');
const { getallgallary, addgallary } = require('../controller/events.controller');
const upload = require('../middleware/upload');

const router = express.Router()

router.get('/',getallgallary)
router.post('/',upload.single("image"),addgallary)

module.exports = router