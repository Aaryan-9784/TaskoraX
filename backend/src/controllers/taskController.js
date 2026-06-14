const Task = require('../models/Task');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

exports.createTask = catchAsync(async (req, res, next) => {
  const newTask = await Task.create({
    ...req.body,
    createdBy: req.user.id,
  });

  res.status(201).json({
    status: 'success',
    data: {
      task: newTask,
    },
  });
});

exports.getAllTasks = catchAsync(async (req, res, next) => {
  // 1) Filtering
  const queryObj = { ...req.query };
  const excludedFields = ['page', 'sort', 'limit', 'fields', 'search'];
  excludedFields.forEach((el) => delete queryObj[el]);

  let query = Task.find({ createdBy: req.user.id, ...queryObj });

  // 2) Searching
  if (req.query.search) {
    query = query.find({
      $or: [
        { title: { $regex: req.query.search, $options: 'i' } },
        { description: { $regex: req.query.search, $options: 'i' } },
      ],
    });
  }

  // 3) Sorting
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt'); // Default sorting
  }

  // 4) Pagination
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 10;
  const skip = (page - 1) * limit;

  query = query.skip(skip).limit(limit);

  // Execute query
  const tasks = await query;
  
  // Get total count for pagination metadata
  const totalTasks = await Task.countDocuments({ createdBy: req.user.id, ...queryObj });
  const totalPages = Math.ceil(totalTasks / limit);

  res.status(200).json({
    status: 'success',
    results: tasks.length,
    pagination: {
      totalTasks,
      totalPages,
      currentPage: page,
      limit,
    },
    data: {
      tasks,
    },
  });
});

exports.getTask = catchAsync(async (req, res, next) => {
  const task = await Task.findOne({ _id: req.params.id, createdBy: req.user.id });

  if (!task) {
    return next(new AppError('No task found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      task,
    },
  });
});

exports.updateTask = catchAsync(async (req, res, next) => {
  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, createdBy: req.user.id },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!task) {
    return next(new AppError('No task found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      task,
    },
  });
});

exports.deleteTask = catchAsync(async (req, res, next) => {
  const task = await Task.findOneAndDelete({ _id: req.params.id, createdBy: req.user.id });

  if (!task) {
    return next(new AppError('No task found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
