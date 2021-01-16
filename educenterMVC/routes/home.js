const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home.js');
const { ensureAuthenticated } = require('../config/auth.js');

// Student
router.get('/my-courses/wishlist', ensureAuthenticated, homeController.renderWishlist);
router.get('/my-courses/learning', ensureAuthenticated, homeController.renderLearning);

// Instructor

module.exports = router;