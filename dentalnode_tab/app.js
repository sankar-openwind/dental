
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path')
  , passport = require('passport')
  , mongoose = require('mongoose')
  , flash    = require('connect-flash')
  , port     = 82;

var app = express();

var configDB = require('./config/datasource.js');

//configuration ===============================================================
mongoose.connect(configDB.url);

app.configure(function() {
	app.use(express.logger('dev'));
	app.use(express.cookieParser());
	app.use(express.bodyParser());

	app.set('view engine', 'ejs');
	app.use(express.static(__dirname + '/public'));
	app.use(express.static(__dirname + '/public/img'));
	app.use(express.static(__dirname + '/public/stylesheets'));
	app.use(express.static(__dirname + '/public/fonts'));
	app.use(express.static(__dirname + '/public/javascripts'));
	app.use(express.static(__dirname + '/public/javascripts/vendor'));

	// required for passport
	app.use(express.session({ secret: 'dentalapp' }));
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(flash());

});

// PASSPORT CONFIGURATION
require('./config/passport')(passport);

// ROUTES
require('./routes/routes.js')(app, passport);

http.createServer(app).listen(port, function(){
  console.log('Express server listening on port ' + port);
});
