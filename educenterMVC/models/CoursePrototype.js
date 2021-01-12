const mongoose = require('mongoose');

const CoursePrototypeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  status: {
      type: String,
      default: 'Draft'
  },
  idInstructors: [String]
});

const CoursePrototype = mongoose.model('CoursePrototype', CoursePrototypeSchema);

module.exports = CoursePrototype;