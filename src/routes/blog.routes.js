const express = require('express');
const { getAllBlogs, addBlog } = require('../controller/blog.controller');
const upload = require('../middleware/upload');

const router  = express.Router()

router.get('/',getAllBlogs) // router to get all services
router.post('/', upload.single("image"),addBlog ) //  router to add service

module.exports = router