const User = require('../models/User');
const Task = require('../models/Task');
const ActivityLog = require('../models/ActivityLog');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

// Log Activity Helper
const logActivity = async (userId, action, req, metadata = {}) => {
  try {
    await ActivityLog.create({
      user: userId,
      action,
      ip: req.ip || req.connection.remoteAddress,
      metadata,
    });
  } catch (error) {
    console.error('Failed to log activity:', error);
  }
};

// --------------------------------------------------------------------------
// DASHBOARD & ANALYTICS
// --------------------------------------------------------------------------

exports.getDashboardStats = catchAsync(async (req, res, next) => {
  const [totalUsers, activeUsers, admins, newUsersThisMonth] = await Promise.all([
    User.countDocuments(),
    User.countDocuments({ isActive: true }),
    User.countDocuments({ role: { $in: ['admin', 'superadmin'] } }),
    User.countDocuments({
      createdAt: {
        $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
      }
    })
  ]);

  const [totalTasks, completedTasks, pendingTasks, overdueTasks] = await Promise.all([
    Task.countDocuments(),
    Task.countDocuments({ status: 'Done' }),
    Task.countDocuments({ status: { $ne: 'Done' } }),
    Task.countDocuments({ dueDate: { $lt: new Date() }, status: { $ne: 'Done' } })
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      stats: {
        totalUsers,
        activeUsers,
        totalTasks,
        completedTasks,
        pendingTasks,
        overdueTasks,
        totalAdmins: admins,
        newUsersThisMonth
      }
    }
  });
});

exports.getAnalytics = catchAsync(async (req, res, next) => {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  // User Growth
  const userGrowth = await User.aggregate([
    { $match: { createdAt: { $gte: thirtyDaysAgo } } },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        count: { $sum: 1 }
      }
    },
    { $sort: { _id: 1 } }
  ]);

  // Task Growth
  const taskGrowth = await Task.aggregate([
    { $match: { createdAt: { $gte: thirtyDaysAgo } } },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        count: { $sum: 1 }
      }
    },
    { $sort: { _id: 1 } }
  ]);

  // Task Completion Rate (Overall)
  const taskStats = await Task.aggregate([
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 }
      }
    }
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      userGrowth,
      taskGrowth,
      taskStats
    }
  });
});

// --------------------------------------------------------------------------
// USER MANAGEMENT
// --------------------------------------------------------------------------

exports.getUsers = catchAsync(async (req, res, next) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const skip = (page - 1) * limit;

  // Build query
  const queryObj = {};

  if (req.query.search) {
    queryObj.$or = [
      { name: { $regex: req.query.search, $options: 'i' } },
      { email: { $regex: req.query.search, $options: 'i' } }
    ];
  }

  if (req.query.role) queryObj.role = req.query.role;
  if (req.query.status) queryObj.isActive = req.query.status === 'active';

  // Sort
  let sortBy = '-createdAt';
  if (req.query.sort) {
    sortBy = req.query.sort.split(',').join(' ');
  }

  const users = await User.find(queryObj)
    .select('+isActive') // need to explicitly select if it's select: false
    .sort(sortBy)
    .skip(skip)
    .limit(limit);

  const total = await User.countDocuments(queryObj);

  res.status(200).json({
    status: 'success',
    results: users.length,
    total,
    page,
    pages: Math.ceil(total / limit),
    data: { users }
  });
});

exports.getUserDetails = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id).select('+isActive');
  if (!user) return next(new AppError('No user found with that ID', 404));

  res.status(200).json({
    status: 'success',
    data: { user }
  });
});

exports.createUser = catchAsync(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  // Role validation
  if (role === 'superadmin' && req.user.role !== 'superadmin') {
    return next(new AppError('Only Super Admin can create another Super Admin', 403));
  }

  const newUser = await User.create({
    name,
    email,
    password,
    role: role || 'user',
    createdBy: req.user._id
  });

  newUser.password = undefined;

  await logActivity(req.user._id, 'User Registration', req, { targetUser: newUser._id, role: newUser.role });

  res.status(201).json({
    status: 'success',
    data: { user: newUser }
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const { role, isActive, ...otherUpdates } = req.body;
  
  if (role === 'superadmin' && req.user.role !== 'superadmin') {
    return next(new AppError('Only Super Admin can assign Super Admin role', 403));
  }

  const user = await User.findById(req.params.id);
  if (!user) return next(new AppError('User not found', 404));

  // If trying to modify a superadmin, only superadmin can do it
  if (user.role === 'superadmin' && req.user.role !== 'superadmin') {
    return next(new AppError('You cannot modify a Super Admin', 403));
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    { ...otherUpdates, role, isActive, updatedBy: req.user._id },
    { new: true, runValidators: true }
  ).select('+isActive');

  await logActivity(req.user._id, 'User Update', req, { targetUser: updatedUser._id });

  res.status(200).json({
    status: 'success',
    data: { user: updatedUser }
  });
});

exports.activateUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, { isActive: true }, { new: true });
  if (!user) return next(new AppError('User not found', 404));

  await logActivity(req.user._id, 'User Update', req, { targetUser: user._id, action: 'Activated' });

  res.status(200).json({ status: 'success', data: { user } });
});

exports.deactivateUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) return next(new AppError('User not found', 404));

  if (user.role === 'superadmin' && req.user.role !== 'superadmin') {
    return next(new AppError('You cannot deactivate a Super Admin', 403));
  }

  user.isActive = false;
  await user.save({ validateBeforeSave: false });

  await logActivity(req.user._id, 'User Update', req, { targetUser: user._id, action: 'Deactivated' });

  res.status(200).json({ status: 'success', data: { user } });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) return next(new AppError('User not found', 404));

  if (user.role === 'superadmin' && req.user.role !== 'superadmin') {
    return next(new AppError('You cannot delete a Super Admin', 403));
  }

  // Soft Delete: just deactivate, or hard delete? The prompt said "Soft Delete Preferred"
  user.isActive = false;
  await user.save({ validateBeforeSave: false });

  await logActivity(req.user._id, 'User Delete', req, { targetUser: user._id, action: 'Soft Delete' });

  res.status(204).json({ status: 'success', data: null });
});

// --------------------------------------------------------------------------
// TASK MANAGEMENT
// --------------------------------------------------------------------------

exports.getTasks = catchAsync(async (req, res, next) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const skip = (page - 1) * limit;

  const tasks = await Task.find()
    .populate('createdBy', 'name email avatar')
    .sort('-createdAt')
    .skip(skip)
    .limit(limit);

  const total = await Task.countDocuments();

  res.status(200).json({
    status: 'success',
    results: tasks.length,
    total,
    page,
    pages: Math.ceil(total / limit),
    data: { tasks }
  });
});

exports.getTaskDetails = catchAsync(async (req, res, next) => {
  const task = await Task.findById(req.params.id).populate('createdBy', 'name email avatar');
  if (!task) return next(new AppError('Task not found', 404));

  res.status(200).json({ status: 'success', data: { task } });
});

exports.updateTaskStatus = catchAsync(async (req, res, next) => {
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true, runValidators: true }
  );
  if (!task) return next(new AppError('Task not found', 404));

  await logActivity(req.user._id, 'Task Update', req, { taskId: task._id, newStatus: req.body.status });

  res.status(200).json({ status: 'success', data: { task } });
});

exports.deleteTask = catchAsync(async (req, res, next) => {
  const task = await Task.findByIdAndDelete(req.params.id);
  if (!task) return next(new AppError('Task not found', 404));

  await logActivity(req.user._id, 'Task Delete', req, { taskId: task._id });

  res.status(204).json({ status: 'success', data: null });
});

// --------------------------------------------------------------------------
// ACTIVITY LOGS
// --------------------------------------------------------------------------

exports.getActivityLogs = catchAsync(async (req, res, next) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 20;
  const skip = (page - 1) * limit;

  const logs = await ActivityLog.find()
    .populate('user', 'name email avatar')
    .sort('-createdAt')
    .skip(skip)
    .limit(limit);

  const total = await ActivityLog.countDocuments();

  res.status(200).json({
    status: 'success',
    results: logs.length,
    total,
    page,
    pages: Math.ceil(total / limit),
    data: { logs }
  });
});
