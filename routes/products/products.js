const express = require('express');
const router = express.Router();
var Product = require('../../models/product');

/**
 * PRODUCTS CREATIONS PAGES IS HERE
 *
 * 1) created model product
 * 2) getting model from db with method find()
 * 3) posting to db with save()
 * 4) edit and upload image
 * 5) delete
 *
 */

// Main product route

router.get('/', function (req, res) {

  if (!req.user) {
    res.redirect('/login')
  }

  // Search by query methods in db

  if(req.query.displayName) {
    var displayName = req.query['displayName'];

    Product.find({displayName: displayName}, function (err, product) {
      return res.render('product/product', { product : product, user: req.user })
    });

  } else if (req.query.email) {
    var email = req.query['email'];

    Product.find({displayName: email}, function (err, product) {
      return res.render('product/product', { product : product, user: req.user })
    });

  } else {

    Product.find({}, function (err, product) {
      return res.render('product/product', { product : product, user: req.user })
    });

  }
});

// Pagination Pages route

router.get('/pages/:page', function(req, res, next) {
  var perPage = 3;
  var page = req.params.page || 1;

  Product.find({}).skip((perPage * page) - perPage).limit(perPage).exec(function(err, product) {
    Product.count().exec(function(err, count) {
      if (err) return next(err);
      res.render('product/product', {
        product: product,
        current: page,
        pages: Math.ceil(count / perPage)
      })
    })
  })
});


//Create Product Page render method
router.get('/edit', function(req, res) {
  return res.render('product/product_create', { user: req.user })
});

//Create Product method
router.post('/', function(req, res) {

  // Image upload method

  var imgLink = '';

  if (req.files.image != undefined) {

    var sampleFile = req.files.image;

    sampleFile.mv('public/img/' + sampleFile.name, function(err) {
      if (err) {
        return res.status(500).send(err);
      }
    });

    imgLink = '/img/' + sampleFile.name;
  }

  var product = new Product({
    email: req.body.email,
    displayName: req.body.displayName,
    image: imgLink
  });

  product.save(function (err) {
    if (err) {
      return res.send({ err: err });
    }
  });

  return res.redirect('/products');
});


//Delete product
router.delete('/:id', function (req, res) {

  Product.findByIdAndRemove(req.params.id, function(err) {

    if (err) {
      return res.status(500).send(err);
    }
  });

  return res.end('{"success" : "Updated Successfully", "status" : 200}');
});

// Edit product
router.get('/edit', function (req, res) {
  return res.render('product/product_edit', { user: req.user })
});

router.post('/edit', function (req, res) {

  var sampleFile = req.files.image;

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv('public/img/' + sampleFile.name, function(err) {
    if (err) {
      return res.status(500).send(err);
    }

    res.send('File uploaded!');
  });

});


module.exports = router;
