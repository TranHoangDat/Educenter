const CourseInfo = require('../models/CourseInfo.js');
const StudentCourse = require('../models/StudentCourse.js');
const StudentWishlist = require('../models/StudentWishlist.js');

module.exports = {
  renderWishlist: async function(req, res) {
    const studentWishlist = await StudentWishlist.findOne({ idStudent: req.user._id });
    const wishlist = await CourseInfo.find({ idCourse: { $in: studentWishlist.idCourse } });
    res.render('wishlist', {
      layout: 'layouts/sPageLayout',
      user: req.user,
      wishlist,
      allCourses: null
    });
  },
  renderLearning: async function(req, res) {
    const student = req.user;
    const studentCourse = await StudentCourse.findOne({ idStudent: student._id });
    // res.render('', { wishlist: studentCourse.idLearning });
  },
  addWishlist: async function(req, res) {
    const student = req.user;
    await StudentCourse.updateOne(
      { idStudent: student._id },
      { $push: { idWishlist: req.body.idCourse } }
    );
  },
  removeWishlist: async function(req, res) {
    const student = req.user;
    await StudentCourse.updateOne(
      { idStudent: student._id },
      { $pull: { idWishlist: { $in: [req.body.idCourse] } } }
    );
  }
}