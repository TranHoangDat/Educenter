const mongoose = require('mongoose');

const CourseInfoSchema = new mongoose.Schema({
  idCourse: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'Draft'
  },
  mainContents: [String],
  requirements: [String],
  targetStudents: [String],
  instructors: [Object],
  subTitle: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  rating: Number,
  voters: Number,
  price: Number,
  buyers: Number,
  lastUpdatedDate: {
    type: Date,
    default: Date.now
  }
});

const CourseInfo = mongoose.model('CourseInfo', CourseInfoSchema);

module.exports = CourseInfo;
