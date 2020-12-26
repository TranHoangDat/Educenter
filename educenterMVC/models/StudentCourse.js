const mongoose = require('mongoose');

const StudentCourseSchema = new mongoose.Schema({
  idStudent: {
    type: String,
    required: true
  },
  idWishlist: {
    type: [String],
  },
  idLearning: {
    type: [String]
  }
});

const StudentCourse = mongoose.model('StudentLearning', StudentCourseSchema);

module.exports = StudentCourse;
