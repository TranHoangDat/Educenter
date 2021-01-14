const CourseInfo = require('../models/CourseInfo');

module.exports = {
    renderIndex: async function(req, res) {
        const courses = await CourseInfo.find();
        res.render('index', {
            page: 'Home',
            user: req.user,
            courses
        });
    }
}