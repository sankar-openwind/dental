// server.js

// set up ======================================================================
// get all the tools we need
var express = require('express');
var app = express();
var mongoose = require('mongoose');

var configDB = require('./config/database.js');

var ipaddr = "localhost";
var port = parseInt(process.env.OPENSHIFT_NODEJS_PORT) || 81;
if (typeof ipaddr === "undefined") {
    console.warn('No OPENSHIFT_NODEJS_IP environment variable');
};
// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

app.configure(function () {
    // set up our express application
    app.use(express.logger('dev')); // log every request to the console
    app.use(express.cookieParser()); // read cookies (needed for auth)
    app.use(express.bodyParser()); // get information from html forms

    app.set('view engine', 'ejs'); // set up ejs for templating
    app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users
    app.use(express.static(__dirname + '/public/img')); // set the static files location /public/img will be /img for users
    app.use(express.static(__dirname + '/public/css')); // set the static files location /public/img will be /img for users
    app.use(express.static(__dirname + '/public/js')); // set the static files location /public/img will be /img for users
    app.use(express.static(__dirname + '/public/js/angular')); // set the static files location /public/img will be /img for users

});

// routes ======================================================================
require('./app/routes.js')(app); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(port, ipaddr, function () {
    console.log('%s: Node server started on %s:%d ...', Date(Date.now()), ipaddr, port);
});
console.log('The magic happens on port ' + port);