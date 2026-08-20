const auth = require('./auth');

exports.verifyToken = auth.verifyToken;
exports.protect = auth.protect;
exports.restrictTo = auth.restrictTo;
