const mongoose = require('mongoose');

const StudentWishlistSchema = new mongoose.Schema({
  idStudent: {
    type: String,
    required: true
  },
  idCourse: {
    type: [String],
  }
});

const StudentWishlist = mongoose.model('StudentWishlist', StudentWishlistSchema);

module.exports = StudentWishlist;
