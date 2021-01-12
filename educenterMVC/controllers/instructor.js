const CoursePrototype = require('../models/CoursePrototype');
const CourseInfo = require('../models/CourseInfo');

module.exports = { 
    renderCourses: async function(req, res) {
        const courses = await CoursePrototype.find({ idInstructors: { $in: [req.user._id] } });
        res.render('instructorCourse', {
            layout: 'layouts/instructorDBLayout',
            contentTitle: 'Courses',
            courses
        });
    },
    renderCourseLP: async function(req, res) {
        const courseInfo = await CourseInfo.findOne({ idCourse: req.params.courseId }); 
        res.render('mCourseLP', {
            layout: 'layouts/mPageLayout',
            courseTitle: `${courseInfo.title} | Educenter`,
            contentTitle: 'Course landing page',
            course: courseInfo,
            user: req.user
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
            res.send({ msg: 'success', courseId: newCourse._id });
        } catch(error) {
            res.send({ msg: 'failure' });
        }
    },
}