const express = require('express');
const { forwardAuthenticated } = require('../config/auth');
const router = express.Router();

router.get('/', forwardAuthenticated, (req, res) => res.render('index'));

module.exports = router;
