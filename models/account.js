var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

// Define new Acoount schema with this fields
var Account = new Schema({
  username: String,
  password: String,
  email: String,
  accountEdit: Boolean,
  info: {
    surname: String,
    address: String,
    phone: String,
    age: String
  }
});

//Using passport for our model
Account.plugin(passportLocalMongoose);

//exporting model
module.exports = mongoose.model('Account', Account);