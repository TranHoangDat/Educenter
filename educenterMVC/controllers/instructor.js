const CoursePrototype = require('../models/CoursePrototype');
const CourseInfo = require('../models/CourseInfo');
const CourseGoal = require('../models/CourseGoal');

module.exports = { 
    renderCourses: async function(req, res) {
        const courses = await CoursePrototype.find({ idInstructors: { $in: [req.user._id] } });
        res.render('instructorCourse', {
            layout: 'layouts/instructorDBLayout',
            contentTitle: 'Courses',
            courses
        });
    },
    renderCourseBasics: async function(req, res) {
        const courseInfo = await CourseInfo.findOne({ idCourse: req.params.courseId }); 
        res.render('mCourseBasics', {
            layout: 'layouts/mPageLayout',
            courseId: req.courseId,
            courseTitle: req.courseTitle,
            courseStatus: req.courseStatus,
            contentTitle: 'Course landing page',
            contentId: '#course-landing-page',
            course: courseInfo,
            user: req.user
        });
    },
    renderCourseGoals: async function(req, res) {
        const courseGoal = await CourseGoal.findOne({ idCourse: req.params.courseId });
        res.render('mCourseGoals', {
            layout: 'layouts/mPageLayout',
            courseId: req.courseId,
            courseTitle: req.courseTitle,
            courseStatus: req.courseStatus,
            contentTitle: 'Target your students',
            contentId: '#target-your-students',
            course: courseGoal,
        });
    },
    renderCourseCurriculum: function(req, res) {
        res.render('mCourseCurriculum', {
            layout: 'layouts/mPageLayout',
            courseId: req.courseId,
            courseTitle: req.courseTitle,
            courseStatus: req.courseStatus,
            contentTitle: 'Curriculum',
            contentId: '#curriculum',
        });
    },
    addCourse: async function(req, res) {
        const newCourse = new CoursePrototype({
            title: req.body.courseTitle,
            idInstructors: [req.user._id]
        });

        try {
            await newCourse.save();
            const newCourseInfo = new CourseInfo({
                idCourse: newCourse._id,
                title: req.body.courseTitle,
                category: req.body.courseCategory,
                instructors: [{ id: req.user._id, name: req.user.name }]
            });
            await newCourseInfo.save();
            const newCourseGoal = new CourseGoal({
                idCourse: newCourse._id
            });
            await newCourseGoal.save();
            res.send({ msg: 'success', courseId: newCourse._id });
        } catch(error) {
            res.send({ msg: 'failure' });
        }
    },
}