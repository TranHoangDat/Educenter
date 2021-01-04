const express = require('express');
const router = express.Router();

router.get('/learning', (req, res) => {
    res.render('learning');
});

module.exports = router;