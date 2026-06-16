const jwt = require('jsonwebtoken');
const UAParser = require('ua-parser-js');

const signToken = (id, secret, expiresIn) => {
  return jwt.sign({ id }, secret, {
    expiresIn,
  });
};

const createSendToken = async (user, statusCode, res, req) => {
  const token = signToken(user._id, process.env.JWT_SECRET, process.env.JWT_EXPIRES_IN);
  const refreshToken = signToken(
    user._id,
    process.env.JWT_REFRESH_SECRET,
    process.env.JWT_REFRESH_EXPIRES_IN
  );

  if (req && user.sessions) {
    const parser = new UAParser(req.headers['user-agent']);
    const result = parser.getResult();
    
    user.sessions.push({
      token: refreshToken,
      device: result.device.model || result.device.vendor || 'Computer',
      os: `${result.os.name || 'Unknown'} ${result.os.version || ''}`.trim(),
      browser: `${result.browser.name || 'Unknown'} ${result.browser.major || ''}`.trim(),
      ip: req.ip || req.connection?.remoteAddress || 'Unknown',
      lastActive: Date.now()
    });
    
    // Keep max 5 sessions
    if (user.sessions.length > 5) {
      user.sessions = user.sessions.slice(-5);
    }
    
    await user.save({ validateBeforeSave: false });
  }

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
