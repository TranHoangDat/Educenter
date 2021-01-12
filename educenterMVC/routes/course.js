const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
    res.render('course', {
        layout: 'layouts/courseLayout'
    });
});

module.exports = router;
