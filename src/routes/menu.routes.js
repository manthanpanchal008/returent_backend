const express = require('express');

const {additem,allitem} = require('../controller/menu.controller');

const router  = express.Router();

router.post('/additem',additem)
router.get('/allitems',allitem)

module.exports = router