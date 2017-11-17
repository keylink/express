var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();

/**
 * >>> TODO new add new Model to db and manipulate this data on the page
 *
 * var Person = require('../models/person');
 *
 */

//MiddleWare show request data
var requestTime = function (req, res, next) {
  req.requestTime = new Date();
  //console.log(req.user, req.person);
  next()
};

//Using my custom middleware which prints request to db

router.use(requestTime);

// ROUTES *****

router.get('/', function (req, res) {
  res.render('index', { user : req.user });
});

// Register page via passport ROUTES

router.get('/register', function(req, res) {
  res.render('register', { });
});

router.post('/register', function(req, res) {
  Account.register(
    new Account({
      username : req.body.username,
      accountEdit: false
    }),
    req.body.password, function(err, account) {

    if (err) {
      return res.render('register', { account : account });
    }

    passport.authenticate('local')(req, res, function () {
      res.redirect('/');
    });
  });
});

// Login page Routes

router.get('/login', function(req, res) {
  res.render('login', { user : req.user });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
  res.redirect('/myProfile');
  req.flash('info', 'Hi there!')
});

//Logout Routes

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});


/**
 * MYPAGE Routes ( /myProfile ) collect and edit data route
 *
 * 1) PAGE RENDER method and pass values to view
 * 2) findByIdAndUpdate method used to search by user Id, then I used $set method to change { email } field value
 *
 */

router.get('/myProfile', function (req, res) {

  //If user not Login in redirect to home page
  if (!req.user) {
    res.redirect('/')
  }
  res.render('myProfile', { user: req.user, requestTime1: req.requestTime })
});

router.get('/simplePage', function (req, res) {
  res.render('simplePage', {})
});

router.get('/edit', function (req, res) {

  //If user not Login in redirect to home page
  if (!req.user) {
    res.redirect('/')
  }
  res.render('edit', { user: req.user, requestTime1: req.requestTime })
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
      return res.render('edit', { user : user });
    }
  });

  res.redirect('/myProfile');
});

//Delete account
router.post('/delete/:id', function (req, res) {

  Account.findByIdAndRemove(req.params.id, function(err) {

    if (err) {

      return res.status(200).send(err);
    }
  });
  console.log("------redirect is here--------");
  //return res.redirect('/login');
  return res.send({redirect: '/login'});

});


// router.post("delete/:id", deleteUser); // This is reached when the client calls post('delete/user/1a2b3c4d'). The id is read with req.params.id
//
// deleteUser(req,res) {
//   User.findById(req.params.id)
//     .remove()
//     .exec( error => { // Reply to the client, otherwise the request will hang and timeout.
//     if(error) return res.status(500).send(error);
//   res.status(200).end()
// })
// }

// 404 page
router.get('*', function(req, res){
  res.send('Sorry this page doesnt exist', 404);
});

//Custom test ping Route

router.get('/ping', function(req, res){
  res.status(200).send("pong!");
});

module.exports = router;