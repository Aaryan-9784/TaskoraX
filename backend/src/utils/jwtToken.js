const jwt = require('jsonwebtoken');

const signToken = (id, secret, expiresIn) => {
  return jwt.sign({ id }, secret, {
    expiresIn,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id, process.env.JWT_SECRET, process.env.JWT_EXPIRES_IN);
  const refreshToken = signToken(
    user._id,
    process.env.JWT_REFRESH_SECRET,
    process.env.JWT_REFRESH_EXPIRES_IN
  );

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    refreshToken,
    data: {
      user,
    },
  });
};

module.exports = {
  signToken,
  createSendToken,
};
