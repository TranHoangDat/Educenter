const express = require('express');
const router = express.Router();
const instructorController = require('../controllers/instructor.js');
const { instructorAuth, manageCourseAuth } = require('../config/auth.js');

router.get('/course', instructorAuth, instructorController.renderCourses);

router.get('/course/:courseId', manageCourseAuth, (req, res) => res.redirect(`/instructor/course/${req.params.courseId}/manage/basics`));

// router.get('/course/:courseId', (req, res) => res.redirect(`/instructor/course/${req.params.courseId}/manage/basics`));

router.get('/course/:courseId/manage/basics', manageCourseAuth, instructorController.renderCourseLP);

// router.get('/course/:courseId/manage/basics', instructorController.renderCourseLP);

router.post('/course/newCourse', instructorController.addCourse);

module.exports = router;