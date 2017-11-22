const express = require('express');
const router = express.Router();
var passport = require('passport');


// Login page Routes

router.get('/login', function(req, res) {
  res.render('accounts/login', { user : req.user });
});


router.post('/login', passport.authenticate('local'), function(req, res) {
  res.redirect('/profile');
});


module.exports = router;