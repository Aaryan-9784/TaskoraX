const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('../models/User');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const { createSendToken } = require('../utils/jwtToken');
const sendEmail = require('../services/emailService');

exports.register = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }

  // 2) Check if user exists && password is correct
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  // 3) If everything ok, send token to client
  createSendToken(user, 200, res);
});

exports.refreshToken = catchAsync(async (req, res, next) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return next(new AppError('Please provide a refresh token', 400));
  }

  // 1) Verify refresh token
  let decoded;
  try {
    decoded = await promisify(jwt.verify)(
      refreshToken,
      process.env.JWT_REFRESH_SECRET
    );
  } catch (error) {
    return next(new AppError('Invalid refresh token. Please log in again.', 401));
  }

  // 2) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        'The user belonging to this token does no longer exist.',
        401
      )
    );
  }

  // 3) Issue new tokens
  createSendToken(currentUser, 200, res);
});

exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on POSTed email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError('There is no user with email address.', 404));
  }

  // 2) Generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // 3) Send it to user's email
  const resetURL = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password/${resetToken}`;

  const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;
  
  const html = `
    <div style="max-width: 600px; margin: 0 auto; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background-color: #f8fafc;">
      <!-- Gradient top bar -->
      <div style="height: 5px; background: linear-gradient(90deg, #d93b3b, #a31919); border-radius: 10px 10px 0 0;"></div>
      
      <!-- Header -->
      <div style="text-align: center; padding: 36px 20px 24px;">
        <h1 style="color: #0f172a; font-size: 30px; font-weight: 800; margin: 0; letter-spacing: -0.5px;">Taskora<span style="color: #d93b3b;">X</span></h1>
      </div>

      <!-- Main Card -->
      <div style="background-color: #ffffff; margin: 0 20px; padding: 36px 32px; border-radius: 12px; box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.05), 0 0 3px rgba(0, 0, 0, 0.02); border-left: 4px solid #d93b3b;">
        <h2 style="color: #0f172a; font-size: 22px; font-weight: 700; margin: 0 0 16px 0; letter-spacing: -0.3px;">Reset Your Password</h2>
        <p style="color: #475569; line-height: 1.7; font-size: 15px; margin: 0 0 8px 0;">
          You requested a password reset. Click the button below to choose a new password.
        </p>
        <p style="color: #475569; line-height: 1.7; font-size: 15px; margin: 0 0 28px 0;">
          This link is only valid for <strong style="color: #0f172a;">15 minutes</strong>.
        </p>
        
        <!-- CTA Button -->
        <div style="text-align: center; margin: 32px 0;">
          <a href="${resetURL}" style="background: linear-gradient(135deg, #d93b3b, #a31919); color: #ffffff; padding: 14px 36px; text-decoration: none; border-radius: 8px; font-weight: 700; font-size: 15px; display: inline-block; letter-spacing: 0.3px; box-shadow: 0 4px 14px rgba(217, 59, 59, 0.35);">Reset Password</a>
        </div>

        <!-- Divider -->
        <div style="border-top: 1px solid #e2e8f0; margin: 28px 0 20px;"></div>

        <p style="color: #94a3b8; font-size: 13px; line-height: 1.6; margin: 0;">
          If you didn't request a password reset, you can safely ignore this email. Your password will remain unchanged.
        </p>
      </div>

      <!-- Footer -->
      <div style="text-align: center; padding: 28px 20px 32px;">
        <p style="color: #94a3b8; font-size: 12px; margin: 0 0 4px 0; font-weight: 500;">
          Secure Message from TaskoraX Support
        </p>
        <p style="color: #cbd5e1; font-size: 11px; margin: 0;">
          © ${new Date().getFullYear()} TaskoraX · All rights reserved
        </p>
      </div>
    </div>
  `;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Your password reset token (valid for 15 min)',
      message,
      html
    });

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!',
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError('There was an error sending the email. Try again later!', 500)
    );
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on the token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  // 2) If token has not expired, and there is user, set the new password
  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400));
  }
  
  if (req.body.password !== req.body.passwordConfirm) {
    return next(new AppError('Passwords do not match', 400));
  }

  user.password = req.body.password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  // 3) Log the user in, send JWT
  createSendToken(user, 200, res);
});
