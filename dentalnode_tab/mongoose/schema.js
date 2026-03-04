var mongoose = require('mongoose')
, Schema = mongoose.Schema
, bcrypt   = require('bcrypt-nodejs');

user = mongoose.Schema({
	clinicName: String,
	username : String,
	password : String,
	role : String
});

user.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
user.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('users', user);