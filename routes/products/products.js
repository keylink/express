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


// Main product route with search and pagination

router.get('/', function (req, res) {

  var perPage = 3;
  var pages = req.query.pages || 1;
  var email;
  var displayName;
  var newUrl;
  var params = {
    $or: [
      {
        displayName: req.query.displayName
      },
      {
        email: req.query.email
      }
    ]
  };

  //Checking if there is a params for search
  if (req.query.displayName || req.query.email) {
    newParams = params;
  } else {
    newParams = {}
  }

  // Creating new values for pagination url
  if (req.query.displayName) {
    displayName = 'displayName=' + req.query.displayName;
  }
  if (req.query.email) {
    email = 'email=' + req.query.email;
  }

  // Searching in db
  Product.find(newParams).skip((perPage * pages) - perPage).limit(perPage).exec(function(err, product) {
    Product.count(newParams).exec(function(err, count) {
      if (err) return next(err);

      // making new Url for pagination
      if (displayName != undefined && email == undefined) {
        newUrl = '&' + displayName
      } else if (email != undefined && displayName == undefined) {
        newUrl = '&' + email
      } else if (email == undefined && displayName == undefined) {
        newUrl;
      } else {
        newUrl = '&' + email + '&' + displayName;
      }

      // Sending params to view
      res.render('product/product', {
        product: product,
        current: pages,
        pages: Math.ceil(count / perPage),
        params: newUrl
      })
    })
  })
});


//Create Product Page render method
router.get('/edit', function(req, res) {
  return res.render('product/create', { user: req.user })
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
  return res.render('product/edit', { user: req.user })
});


// Search by email route

router.get('/search', function (req, res) {
  Product.find().sort({ email: req.query.email}).exec(function(err, model) {
    res.send(model)
  });
});


module.exports = router;
