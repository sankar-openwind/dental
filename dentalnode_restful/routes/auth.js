var jwt = require('jwt-simple'),
    moment = require('moment'),
    mongoose = require('./../mongoose/schema'),
    error = require('./../error');

const ENCODE = 'q$2hvB+v5A';
const SECRET = 'r2H#3jgfg$gU';

exports.authenticate = async function (req, res) {
    var User = mongoose.doctor;
    var username = req.body.email;
    var password = req.body.password;

    try {
        var user = await User.findOne({ username: username });

        if (!user) {
            res.status(401);
            return res.send({ "error": error.authenticationRequired() });
        }

        if (!user.validPassword(jwt.encode(password, ENCODE))) {
            res.status(401);
            return res.send({ "error": error.authenticationRequired() });
        }

        var expires = moment().add(1, 'day').valueOf();
        var token = jwt.encode({
            iss: username,
            clinicName: user.clinicName,
            role: user.role,
            exp: expires
        }, SECRET);

        var resUser = user.toJSON();
        delete resUser.password;
        delete resUser._id;
        delete resUser.clinicName;
        delete resUser.__v;
        delete resUser.created;

        res.json({
            token: token,
            expires: expires,
            user: resUser
        });
    } catch (err) {
        res.status(401);
        return res.send({ "error": error.authenticationRequired() });
    }
};

exports.signup = async function (req, res) {
    var User = mongoose.doctor;
    var username = req.body.email;
    var password = req.body.password;
    var role = req.body.role;
    var clinicName = req.body.clinicName;

    var user = new User({
        clinicName: clinicName,
        username: username,
        password: jwt.encode(password, ENCODE),
        role: role
    });

    console.log("About to insert to database" + user);

    try {
        await user.save();
        console.log("User is created SUCCESSFULLY " + user);
        res.send("SUCCESS");
    } catch (err) {
        console.log(err);
        res.send(err);
    }
};
