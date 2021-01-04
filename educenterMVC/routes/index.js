const express = require('express');
// const { forwardAuthenticated } = require('../config/auth');
const router = express.Router();

router.get('/', function(req, res) {
    res.render('index', {
        page: 'Home',
        user: req.user
    });
});

module.exports = router;
