const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
    res.render('about', {
        page: 'About',
        user: req.session.user
    });
});

module.exports = router;
