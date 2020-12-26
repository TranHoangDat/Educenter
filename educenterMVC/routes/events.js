const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
    res.render('events', {
        page: 'Events',
        user: req.session.user
    });
});

module.exports = router;
