const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const usersController = require('../controllers/users.js');
require('dotenv').config();

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAIL_USER, 
      pass: process.env.GMAIL_PASS
    },
});

// Login Page
router.get('/login', (req, res) => res.render('login', { layout: 'usersLayout', title: 'Educenter Login' }));

// Register Page
router.get('/register', (req, res) => res.render('register', { title: 'Educenter Register', layout: 'usersLayout' }));

// Register
router.post('/register', (req, res, next) => { req.transporter = transporter; next(); },usersController.register);

// Confirmation
router.get('/confirm', (req, res) => res.render('confirm', { layout: 'usersLayout' }));
router.post('/confirm', (req, res, next) => { req.transporter = transporter; next(); }, usersController.confirm);
router.get('/confirmation/:token', usersController.confirmation);

// Login
router.post('/login', usersController.login);



// Logout
router.get('/logout', usersController.logout);

module.exports = router;