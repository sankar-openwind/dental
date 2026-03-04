var jwt = require('jwt-simple'),
    error = require('./../error');

var secret = 'r2H#3jgfg$gU';

exports.authFilter = function (req, res, next) {
    var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];

    if (token) {
        try {
            // jwt-simple uses decode(), not verify()
            var decoded = jwt.decode(token, secret);
            if (decoded.exp <= Date.now()) {
                return res.status(400).send({
                    error: error.tokenExpired()
                });
            }
            next();
        } catch (err) {
            return res.json({
                success: false,
                message: 'Failed to authenticate token.'
            });
        }
    } else {
        res.status(401).send({
            error: error.authenticationRequired()
        });
    }
};
