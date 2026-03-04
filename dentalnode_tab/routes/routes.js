var fileSystem = require('fs'),
	http = require('follow-redirects').http,
	bunyan  = require('bunyan'),
	log = bunyan.createLogger({name: 'Dental App ',  streams: [
    {
      level: 'info',
      stream: process.stdout            // log INFO and above to stdout
    },
    {
      level: 'debug',
      path: 'dentalApp-debug.log'  // log ERROR and above to a file
    }
  ]});

module.exports = function(app, passport) {
	app.get('/', function(req, res) {
		res.render('index.html');
	});

	app.get('/login', function(req, res) {
		res.render('login.ejs', {
			message : req.flash('loginMessage')
		});
	});

	app.post('/login', passport.authenticate('local-login', {
		successRedirect : '/profile',
		failureRedirect : '/login',
		failureFlash : true
	}));

	app.get('/signup', function(req, res) {
		res.render('signup', {
			message : req.flash('signupMessage')
		});
	});

	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/profile',
		failureRedirect : '/signup',
		failureFlash : true
	}));

	app.get('/profile', isLoggedIn, function(req, res) {
		res.render('profile', {
			user : req.user.username,
			clinicName : req.user.clinicName,
			role : req.user.role
		});
	});

	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
};

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();
	res.redirect('/');
}