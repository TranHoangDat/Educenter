const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.js');
const { ensureAuthenticated } = require('../config/auth.js');
// Edit account
// router.get('/edit-account', ensureAuthenticated, (req, res) =>  res.render('userEditAccount'));
router.post('/edit-account/email', userController.editEmail);
router.post('/edit-account/name', userController.editName);
router.post('/edit-account/password', userController.editPassword);

module.exports = router;