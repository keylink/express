const express = require('express');
const router = express.Router();
var Product = require('../../models/product');
var configs = require('../../configs/configs');
var fs = require('fs');

/**
 * PRODUCTS CREATIONS PAGES IS HERE
 *
 * 1) created model product
 * 2) getting model from db with method find()
 * 3) posting to db with save()
 * 4) edit and upload image
 * 5) delete product
 * 6) TODO: delete image from folder
 * 7) TODO: convert object in http request format
 * 8) TODO: try decoder
 *
 */


// Main product route with search and pagination

router.get('/', function (req, res) {

  var limit = configs.limit;
  var page = req.query.page || 1;
  var skip = (limit * page) - limit;
  var query = {};
  var email = '';
  var displayName = '';
  var searchUrl = '';

  // Checking if there is a params for search
  if ( req.query.displayName || req.query.email ) {
    query = { $or: [{ displayName: req.query['displayName'] }, { email: req.query['email'] }] };
  }

  // Creating new values for pagination url
  if ( req.query['displayName'] ) displayName = '&displayName=' + req.query['displayName'];
  if ( req.query['email'] ) email = '&email=' + req.query['email'];

  // Searching in db
  Product.find(query).skip(skip).limit(limit).exec(function(err, products) {
    Product.count(query).exec(function(err, count) {
      if (err) return next(err);

      searchUrl = displayName + email;
      var totalPages = Math.ceil(count / limit);

      // Sending params to view
      res.render('product/index', {
        products: products,
        currentPage: page,
        totalPages: totalPages,
        searchUrl: searchUrl
      })
    })
  })
});


// Create Product Page render method

router.get('/edit', function(req, res) {
  return res.status(200).render('product/create', { user: req.user })
});


// Create Product method

router.post('/', function(req, res) {

  var imgLink = '';
  var product = new Product({
    email: req.body.email,
    displayName: req.body.displayName,
    image: imgLink,
    productSize: req.body.productSize
  });

  product.save(req, function (err) {
    if (err) {
      return res.status(200).render('product/create', {err: err})
    } else {
      return res.status(200).redirect('/products');
    }
  });
});


// Delete product

router.delete('/:id', function (req, res) {
  Product.findByIdAndRemove(req.params.id, function(err) {
    //fs.unlink();
    if (err) {
      return res.status(500).send(err);
    }
  });
  return res.end('{"success" : "Updated Successfully", "status" : 200}');
});


// Edit product
router.get('/edit', function (req, res) {
  return res.status(200).render('product/edit', { user: req.user })
});


// Search by email route

router.get('/search', function (req, res) {
  Product.find().sort({ email: req.query.email }).exec(function(err, model) {
    res.send(model)
  });
});


module.exports = router;
