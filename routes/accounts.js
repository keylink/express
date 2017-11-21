const express = require('express');
const router = express.Router();
var Account = require('../models/account');
var passport = require('passport');


// ROUTES *******

router.get('/', function (req, res) {
  res.render('index', { user : req.user });
});

// Register page via passport ROUTES

router.get('/register', function(req, res) {
  res.render('accounts/register', { });
});

router.post('/register', function(req, res) {
  Account.register(
    new Account({
      username : req.body.username,
      accountEdit: false
    }),
    req.body.password, function(err, account) {

      if (err) {
        return res.render('accounts/register', { account : account });
      }

      passport.authenticate('local')(req, res, function () {
        res.redirect('/profile/profile');
      });
    });
});

// Login page Routes

router.get('/login', function(req, res) {
  res.render('accounts/login', { user : req.user });
});


router.post('/login', passport.authenticate('local'), function(req, res) {
  res.redirect('/profile/profile');
});


//Logout Routes

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});


module.exports = router;