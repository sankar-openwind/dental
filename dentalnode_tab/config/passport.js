var LocalStrategy   = require('passport-local').Strategy;
var User       		= require('../mongoose/schema');

module.exports = function(passport) {
	
    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(user, done) {
        User.findOne({"username" : user.username}, function(err, user) {
            done(err, user);
        });
    });

    passport.use('local-signup', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },
    function(req, username, password, done) {
    	var clinicName = req.body.clinicName.trim().toLowerCase();
    	var role = req.body.role.trim().toLowerCase();
    	
        User.findOne({ 'username' :  username }, function(err, user) {
            if (err){
            	return done(err);
            }
                
            if (user) {
                return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
            } else {
                var newUser = new User();
                newUser.username = username;
                newUser.password = newUser.generateHash(password);
                newUser.clinicName = clinicName;
                newUser.role = role;
                newUser.save(function(err) {
                	if (err) {
                		throw err;
					}
                    return done(null, newUser);
                });
            }
        });
    }));

    passport.use('local-login', new LocalStrategy({
    	usernameField: 'email',
        passwordField: 'password',
        passReqToCallback : true
    },
    function(req, username, password, done) {
        User.findOne({ 'username' :  username }, function(err, user) {
            if (err)
                return done(err);
            if (!user)
                return done(null, false, req.flash('loginMessage', 'No user found.'));
            if (!user.validPassword(password))
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
            return done(null, user);
        });
    }));
};

var validPassword = function(user, password){
	if(user.password === password){
		return true;
	}else{
		return false;
	}
}
