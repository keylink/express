var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
var Profile = require('./profile');

// Define new Acoount schema with this fields
var Account = new Schema({
  username: String,
  password: String,
  accountEdit: Boolean,
  profile: Profile
});

// Using passport for our model
Account.plugin(passportLocalMongoose);

// Exporting model
module.exports = mongoose.model('Account', Account);