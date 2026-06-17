const jwt = require('jsonwebtoken');
const UAParser = require('ua-parser-js');
const User = require('../models/User');

const signToken = (id, secret, expiresIn) => {
  return jwt.sign({ id }, secret, { expiresIn });
};

const createSendToken = async (user, res, req) => {
  const token = signToken(user._id, process.env.JWT_SECRET, process.env.JWT_EXPIRES_IN);
  const refreshToken = signToken(
    user._id,
    process.env.JWT_REFRESH_SECRET,
    process.env.JWT_REFRESH_EXPIRES_IN
  );

  // Add OAuth session to user sessions array
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

  // Redirect to frontend with token
  // In production, you would configure the frontend URL in env
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
  res.redirect(`${frontendUrl}/oauth-callback?token=${token}&refreshToken=${refreshToken}`);
};

exports.oauthCallback = async (req, res) => {
  if (!req.user) {
    return res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:5173'}/login?error=OAuthFailed`);
  }
  
  await createSendToken(req.user, res, req);
};
