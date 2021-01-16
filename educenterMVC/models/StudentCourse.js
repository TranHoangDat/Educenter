const mongoose = require('mongoose');

const StudentCourseSchema = new mongoose.Schema({
  idStudent: {
    type: String,
    required: true
  },
  idCourse: {
    type: [String]
  }
});

const StudentCourse = mongoose.model('StudentCourse', StudentCourseSchema);

module.exports = StudentCourse;
