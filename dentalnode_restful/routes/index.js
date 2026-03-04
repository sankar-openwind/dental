
/*
 * GET home page.
 */

 var mongoose = require('mongoose'),
          jwt = require('jwt-simple'),
          express = require('express'),
          app = express(),
          mongooseSchema = require('../mongoose/schema');

exports.index = function(req, res){
  res.send("Dental App Restful service");
};

exports.tentant = function(req, res){
    var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];

    console.log("Venkat");
    console.log(token);

    var decoded = jwt.decode(token, "r2H#3jgfg$gU");
    mongoose.mtModel(decoded.clinicName+'tenant2.Foo');
    console.log(decoded);



      var fooConstructor = mongoose.mtModel('tenant2.Foo');
      var myFoo = new fooConstructor({
    title:'My Foo',
    date:new Date()
});

myFoo.save(function(err, result) {
    // This saved it to the collection named "tenant1__foos"
});

      res.send(fooConstructor);

};
