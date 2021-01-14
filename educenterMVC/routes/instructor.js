const express = require('express');
const router = express.Router();
const instructorController = require('../controllers/instructor.js');
const { instructorAuth, manageCourseAuth } = require('../config/auth.js');

router.get('/course', instructorAuth, instructorController.renderCourses);

router.get('/course/:courseId', manageCourseAuth, (req, res) => res.redirect(`/instructor/course/${req.params.courseId}/manage/basics`));

router.get('/course/:courseId/manage/basics', manageCourseAuth, instructorController.renderCourseBasics);

router.get('/course/:courseId/manage/goals', manageCourseAuth, instructorController.renderCourseGoals);

router.get('/course/:courseId/manage/curriculum', manageCourseAuth, instructorController.renderCourseCurriculum);

router.post('/course/newCourse', instructorController.addCourse);

module.exports = router;