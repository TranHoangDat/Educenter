const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.js');

router.get('/edit-account', function(req, res) {
    res.render('userAccount', {
        user: req.user,
        page: ''
    });
});

// Edit profile
router.post('/edit-account/email', userController.editEmail);
router.post('/edit-account/name', userController.editName);
router.post('/edit-account/password', userController.editPassword);

module.exports = router;