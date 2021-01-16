const CourseInfo = require('../models/CourseInfo.js');
const StudentWishlist = require('../models/StudentWishlist.js');

module.exports = {
    renderCourse: async function(req, res) {
        const courseInfo = await CourseInfo.findOne({ idCourse: req.params.courseId });
        let month = courseInfo.lastUpdatedDate.getUTCMonth() + 1;
        let year = courseInfo.lastUpdatedDate.getUTCFullYear();
        let lastUpdatedDate = month + '/' + year;
        let isBestseller = false;
        let ratingPoint = courseInfo.rating / courseInfo.voters;
        let rating = ratingPoint.toFixed(2).toString() + ` (${courseInfo.voters.toString()})`;
        let isWishedCourse = false;
        let userId = null;

        if (req.user) {
            userId = req.user._id;
            const wishlist = await StudentWishlist.findOne({ idStudent: req.user._id, idCourse: { $eq: req.params.courseId } });

            if (wishlist) {
                isWishedCourse = true;
            }
            
        }

        if (courseInfo.buyersPerWeek > 1000) {
            isBestseller = true;
        }

        if (courseInfo) {   
            res.render('course', {
                userId,
                layout: 'layouts/courseLayout',
                course: courseInfo,
                lastUpdatedDate,
                isBestseller,
                rating,
                isWishedCourse
            });
        } else {
            res.redirect('/');
        }
    }
}
