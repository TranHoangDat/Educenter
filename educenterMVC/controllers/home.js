const StudentCourse = require('../models/StudentCourse.js');

module.exports = {
  renderWishlist: async function(req, res) {
    const student = req.user;
    const studentCourse = await StudentCourse.findOne({ idStudent: student._id });
    // res.render('', { wishlist: studentCourse.idWishlist });
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