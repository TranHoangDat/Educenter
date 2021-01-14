const CourseInfo = require('../models/CourseInfo.js');

module.exports = {
    renderCourse: async function(req, res) {
        const courseInfo = await CourseInfo.findOne({ idCourse: req.params.courseId });
        let month = courseInfo.lastUpdatedDate.getUTCMonth() + 1;
        let year = courseInfo.lastUpdatedDate.getUTCFullYear();
        let lastUpdatedDate = month + '/' + year;
        if (courseInfo) {   
            res.render('course', {
                layout: 'layouts/courseLayout',
                course: courseInfo,
                lastUpdatedDate
            });
        } else {
            res.redirect('/');
        }
    }
}
