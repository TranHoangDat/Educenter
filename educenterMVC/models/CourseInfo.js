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
  subCategory: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    default: 'Draft'
  },
  mainContents: [String],
  requirements: [String],
  targetedStudents: [String],
  instructors: [Object],
  subTitle: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  rating: {
    type: Number,
    default: 0
  },
  ratingPerWeek: {
    type: Number,
    default: 0
  },
  voters: {
    type: Number,
    default: 0
  },
  price: Number,
  buyers: {
    type: Number,
    default: 0
  },
  buyersPerWeek: {
    type: Number,
    default: 0
  },
  views: {
    type: Number,
    default: 0
  },
  iat: {
    type: Date,
    default: Date.now
  },
  lastUpdatedDate: {
    type: Date,
    default: Date.now
  }
});

const CourseInfo = mongoose.model('CourseInfo', CourseInfoSchema);

module.exports = CourseInfo;
