const express = require('express');
const router = express.Router();
var Account = require('../../models/account');
var passport = require('passport');

// Register page via passport ROUTES

router.get('/register', function(req, res) {
  res.render('accounts/register', { });
});

router.post('/register', function(req, res) {

  Account.register(
    new Account({
      username : req.body.username,
      accountEdit: false,
      'profile.email': '',
      'profile.surname': '',
      'profile.address': '',
      'profile.phone': '',
      'profile.age': ''
    }),
    req.body.password, function(err, account) {

      if (err) {
        return res.render('accounts/register', { account : account });
      }

      passport.authenticate('local')(req, res, function () {
        res.redirect('/profile');
      });
    });
});

module.exports = router;