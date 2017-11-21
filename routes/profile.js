const express = require('express');
const router = express.Router();
var Account = require('../models/account');

/**
 * Accounts Routes ( /accounts ) collect and edit data route
 *
 * 1) PAGE RENDER method and pass values to view
 * 2) findByIdAndUpdate method used to search by user Id, then I used $set method to change { email } field value
 *
 */


router.get('/profile', function (req, res) {

  //If user not Login in redirect to home page
  if (!req.user) {
    res.redirect('/')
  }
  res.render('accounts/profile', { user: req.user, requestTime1: req.requestTime })
});


router.get('/edit', function (req, res) {

  //If user not Login in redirect to home page
  if (!req.user) {
    res.redirect('/')
  }
  res.render('accounts/edit', { user: req.user, requestTime1: req.requestTime })
});


router.post('/edit', function(req, res) {

  //Creating passing data model to db

  Account.findByIdAndUpdate(req.user.id, { $set: {
    email: req.body.email,
    accountEdit: true,
    "info.surname": req.body.surname,
    "info.address": req.body.address,
    "info.phone": req.body.phone,
    "info.age": req.body.age
  }
  }, { new: true }, function (err, user) {
    if (err) {
      return res.render('accounts/edit', { user : user });
    }
  });

  res.redirect('/profile/profile');
});


//Delete account
router.post('/delete/:id', function (req, res) {

  Account.findByIdAndRemove(req.params.id, function(err) {

    if (err) {

      return res.status(200).send(err);
    }
  });

  return res.redirect('/login');
});

// 404 page
router.get('*', function(req, res){
  res.send('Sorry this page doesnt exist', 404);
});

module.exports = router;