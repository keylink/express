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


//Show product page
router.get('/', function (req, res) {

  if (!req.user) {
    res.redirect('/login')
  }

  Product.find({}, function (err, product) {
    return res.render('product/product', { product : product, user: req.user })
  });

});

//Create Product Page render method
router.get('/edit', function(req, res) {
  return res.render('product/product_create', { user: req.user })
});

//Create Product method
router.post('/', function(req, res) {

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
router.post('/deleteProduct/:id', function (req, res) {

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
