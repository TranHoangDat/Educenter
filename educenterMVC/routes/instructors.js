const express = require('express');
const router = express.Router();
const instructorController = require('../controllers/instructors.js');

// Register
router.post('/register', instructorController.register);

module.exports = router;