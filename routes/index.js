var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();
var Product = require('../models/product');



// ROUTES *****

router.get('/', function (req, res) {
  res.render('index', { user : req.user });
});

// Register page via passport ROUTES

router.get('/register', function(req, res) {
  res.render('profile/register', { });
});

router.post('/register', function(req, res) {
  Account.register(
    new Account({
      username : req.body.username,
      accountEdit: false
    }),
    req.body.password, function(err, account) {

    if (err) {
      return res.render('profile/register', { account : account });
    }

    passport.authenticate('local')(req, res, function () {
      res.redirect('profile/myProfile');
    });
  });
});

// Login page Routes

router.get('/login', function(req, res) {
  res.render('profile/login', { user : req.user });
});


router.post('/login', passport.authenticate('local'), function(req, res) {
  res.redirect('/myProfile');
  req.flash('info', 'Hi there!');
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
  res.render('profile/myProfile', { user: req.user, requestTime1: req.requestTime })
});


router.get('/simplePage', function (req, res) {
  res.render('simplePage/simplePage', {user: req.user})
});


router.get('/edit', function (req, res) {

  //If user not Login in redirect to home page
  if (!req.user) {
    res.redirect('/')
  }
  res.render('profile/edit', { user: req.user, requestTime1: req.requestTime })
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
      return res.render('profile/edit', { user : user });
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

  return res.redirect('/login');
});

/**
 * PRODUCTS CREATIONS PAGES IS HERE
 *
 * 1) created model product
 * 2) getting model from db with method find()
 * 3) posting to db with save()
 * 4) delete
 *
 */

//Create Product Page render method
router.get('/createProduct', function(req, res) {
  return res.render('product/createProduct', { user: req.user })
});


//Show product page
router.get('/product', function (req, res) {

  if (!req.user) {
    res.redirect('/login')
  }

  Product.find({}, function (err, product) {
    return res.render('product/product', { product : product, user: req.user })
  });

});


//Create Product method
router.post('/product', function(req, res) {

  var product = new Product({
    email: req.body.email,
    displayName: req.body.displayName
  });

  product.save(function (err) {
    if (err) {
      return res.send({ err: err });
    }
  });

  return res.redirect('/product');
});


//Delete product
router.post('/deleteProduct/:id', function (req, res) {

  Product.findByIdAndRemove(req.params.id, function(err) {

    if (err) {
      return res.status(500).send(err);
    }
  });

  return res.end('{"success" : "Updated Successfully", "status" : 200}');
});


// 404 page
router.get('*', function(req, res){
  res.send('Sorry this page doesnt exist', 404);
});

//Custom test ping Route

router.get('/ping', function(req, res){
  res.status(200).send("pong!");
});

module.exports = router;