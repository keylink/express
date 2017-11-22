const express = require('express');
const router = express.Router();
var Account = require('../../models/account');

/**
 * Accounts Routes ( /accounts ) collect and edit data route
 *
 * 1) PAGE RENDER method and pass values to view
 * 2) findByIdAndUpdate method used to search by user Id, then I used $set method to change { email } field value
 *
 */


router.get('/', function (req, res) {

  //If user not Login in redirect to home page
  if (!req.user) {
    res.redirect('/')
  }
  res.render('profile/profile', { user: req.user, requestTime1: req.requestTime })
});


router.get('/edit', function (req, res) {

  //If user not Login in redirect to home page
  if (!req.user) {
    res.redirect('/')
  }
  res.render('profile/profile_edit', { user: req.user, requestTime1: req.requestTime })
});


router.post('/edit', function(req, res) {

  //Creating passing data model to db

  Account.findByIdAndUpdate(req.user.id, { $set: {
    email: req.body.email,
    accountEdit: true,
    "profile.surname": req.body.surname,
    "profile.address": req.body.address,
    "profile.phone": req.body.phone,
    "profile.age": req.body.age,
    "profile.email": req.body.email
  }
  }, { new: true }, function (err, user) {
    if (err) {
      return res.render('/profile_edit', { user : user });
    }
  });

  res.redirect('/profile/');
});


// Delete account
router.post('/delete/:id', function (req, res) {

  Account.findByIdAndRemove(req.params.id, function(err) {

    if (err) {

      return res.status(200).send(err);
    }
  });

  return res.redirect('/login');
});


module.exports = router;