const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
    res.render('courses', {
        page: 'Courses',
        user: req.session.user
    });
});

module.exports = router;
