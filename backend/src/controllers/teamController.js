const User = require('../models/User');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

exports.getAllTeamMembers = catchAsync(async (req, res, next) => {
  // In a real app, this might be restricted to a specific organization or workspace.
  // For now, we return all users as "team members".
  const members = await User.find().select('-__v -passwordResetExpires -passwordResetToken');

  res.status(200).json({
    status: 'success',
    results: members.length,
    data: {
      members,
    },
  });
});

exports.updateTeamMember = catchAsync(async (req, res, next) => {
  // Restricted fields that admin/manager can update
  const allowedFields = ['role', 'department', 'status'];
  
  const updateData = {};
  Object.keys(req.body).forEach(el => {
    if (allowedFields.includes(el)) updateData[el] = req.body[el];
  });

  const member = await User.findByIdAndUpdate(req.params.id, updateData, {
    new: true,
    runValidators: true,
  }).select('-__v -passwordResetExpires -passwordResetToken');

  if (!member) {
    return next(new AppError('No member found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      member,
    },
  });
});
