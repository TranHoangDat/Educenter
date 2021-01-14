const express = require('express');
const router = express.Router();
const courseController = require('../controllers/course.js');

router.get('/:courseId', courseController.renderCourse);

module.exports = router;
