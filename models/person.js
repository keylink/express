var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Here is my new Person schema with this fields which I want to manage on page

var Person = new Schema({
  name: String,
  email: String,
  displayName: String
});

//Exporting my new Schema

module.exports = mongoose.model('Person', Person);