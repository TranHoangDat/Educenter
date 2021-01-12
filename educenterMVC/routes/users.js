const express = require('express');
const router = express.Router();
const mailer = require('../config/mailer.js');
const usersController = require('../controllers/users.js');

// Login Page
router.get('/login', (req, res) => res.render('login', { layout: 'layouts/usersLayout', title: 'Educenter Login' }));

// Register Page
router.get('/register', (req, res) => res.render('register', { title: 'Educenter Register', layout: 'layouts/usersLayout' }));

// Register
router.post('/register', (req, res, next) => { req.transporter = mailer.transporter; return next(); }, usersController.register);

// Confirmation
router.get('/confirm', (req, res) => res.render('confirm', { layout: 'layouts/usersLayout', title: 'Educenter Confirm' }));
router.post('/confirm', (req, res, next) => { req.transporter = mailer.transporter; return next(); }, usersController.confirm);
router.get('/confirmation/:token', usersController.confirmation);

// Login
router.post('/login', usersController.login);

// Logout
router.get('/logout', usersController.logout);

module.exports = router;