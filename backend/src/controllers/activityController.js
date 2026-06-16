const Activity = require('../models/Activity');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

exports.getAllActivities = catchAsync(async (req, res, next) => {
  // Can filter by project or user if passed in query
  const query = {};
  if (req.query.project) query.project = req.query.project;
  if (req.query.user) query.user = req.query.user;

  const activities = await Activity.find(query).sort({ timestamp: -1 }).limit(50);

  res.status(200).json({
    status: 'success',
    results: activities.length,
    data: {
      activities,
    },
  });
});

exports.createActivity = catchAsync(async (req, res, next) => {
  const newActivity = await Activity.create({
    ...req.body,
    user: req.user.id,
  });

  res.status(201).json({
    status: 'success',
    data: {
      activity: newActivity,
    },
  });
});
