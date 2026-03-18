const express = require('express');
const { addService, getAllServices } = require('../controller/services.controller');


const router  = express.Router()

router.get('/',getAllServices) // router to get all services
router.post('/',addService ) //  router to add service

module.exports = router