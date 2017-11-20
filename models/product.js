var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// Here is my new Person schema with this fields which I want to manage on page

var Product = new Schema({
  email: String,
  displayName: String,
  image: { data: Buffer, contentType: String }
});


//Exporting my new Schema

module.exports = mongoose.model('Product', Product);