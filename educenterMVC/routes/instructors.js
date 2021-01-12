const express = require('express');
const router = express.Router();
const mailer = require('../config/mailer.js');
const instructorsController = require('../controllers/instructors.js');

// Register
router.post('/register', (req, res, next) => { req.transporter = mailer.transporter; next(); }, instructorsController.register);

module.exports = router;