exports.authenticationRequired = function () {
    return 'Wrong Credentials !!! Username not found.';
};

exports.tokenExpired = function () {
    return 'Access token has expired !!!';
};

exports.internalServerError = function () {
    return 'Oops!!! Internal Server Error.';
}