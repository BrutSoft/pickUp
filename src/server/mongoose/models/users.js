var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');


var User = new Schema({
  username: String,
  password: String
});

User.plugin(passportLocalMongoose);

User.methods.verifyPassword = function () {
  console.log('verifying password...');
  //TODO actually make a verification
  return true;
}

module.exports = mongoose.model('users', User);
