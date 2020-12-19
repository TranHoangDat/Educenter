const express = require('express');
const userController = require('../controllers/users.js');

const router = express.Router();

// Load User model

const { forwardAuthenticated } = require('../config/auth');

// Login Page
router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));

// Register Page
router.get('/register', forwardAuthenticated, (req, res) => res.render('register'));

// Register
router.post('/register', userController.register);

// Login
router.post('/login', userController.login);

// Logout
router.get('/logout', userController.logout);

module.exports = router;
