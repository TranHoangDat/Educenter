const express = require('express');
const router = express.Router();
const mailer = require('../config/mailer.js');
const userController = require('../controllers/user.js');
const { ensureAuthenticated } = require('../config/auth.js');

router.get('/edit-account', ensureAuthenticated, function(req, res) {
    res.render('userAccount', {
        user: req.user,
        page: ''
    });
});

// Edit profile
router.post('/edit-account/email', (req, res, next) => { req.transporter = mailer.transporter; return next(); }, userController.editEmail);
router.post('/edit-account/name', userController.editName);
router.post('/edit-account/password', userController.editPassword);

module.exports = router;