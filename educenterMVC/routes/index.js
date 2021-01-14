const express = require('express');
// const { forwardAuthenticated } = require('../config/auth');
const router = express.Router();
const indexController = require('../controllers/index.js');

router.get('/', indexController.renderIndex);

module.exports = router;
