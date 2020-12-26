const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
    res.render('Blog', {
        page: 'Blog',
        user: req.session.user
    });
});

module.exports = router;
