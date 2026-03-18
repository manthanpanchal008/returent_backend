const express = require('express');
const { addteam, getallteam } = require('../controller/team.controller');
const upload = require('../middleware/upload');

const router  = express.Router()

router.get('/',getallteam)
router.post('/', upload.single("profile"),addteam)

module.exports = router