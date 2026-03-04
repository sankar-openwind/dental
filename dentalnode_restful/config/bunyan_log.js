/**
 * New node file
 */
var bunyan  = require('bunyan');

exports.log = bunyan.createLogger({
	name : 'Dental App ',
	streams : [ {
		level : 'info',
		stream : process.stdout
	// log INFO and above to stdout
	}, {
		level : 'debug',
		path : 'dentalApp-debug.log' // log ERROR and above to a file
	} ,{
		level : 'error',
		path : 'dentalApp-error.log' // log ERROR and above to a file
	}]
});