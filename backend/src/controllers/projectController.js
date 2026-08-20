const Project = require('../models/Project');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

exports.getAllProjects = catchAsync(async (req, res, next) => {
  const projects = await Project.find({
    $or: [{ owner: req.user.id }, { team: req.user.id }]
  }).populate('team', 'name avatar role');

  res.status(200).json({
    status: 'success',
    results: projects.length,
    data: {
      projects,
    },
  });
});

exports.getProject = catchAsync(async (req, res, next) => {
  const project = await Project.findOne({
    _id: req.params.id,
    $or: [{ owner: req.user.id }, { team: req.user.id }]
  }).populate('team', 'name avatar role department email');

  if (!project) {
    return next(new AppError('No project found with that ID or you do not have permission', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      project,
    },
  });
});

exports.createProject = catchAsync(async (req, res, next) => {
  const newProject = await Project.create({
    ...req.body,
    owner: req.user.id,
    team: req.body.team ? [...new Set([...req.body.team, req.user.id])] : [req.user.id]
  });

  await newProject.populate('team', 'name avatar role department email');

  res.status(201).json({
    status: 'success',
    data: {
      project: newProject,
    },
  });
});

exports.updateProject = catchAsync(async (req, res, next) => {
  // Prevent changing owner through regular update
  delete req.body.owner;

  const project = await Project.findOneAndUpdate(
    {
      _id: req.params.id,
      $or: [{ owner: req.user.id }, { team: req.user.id }]
    },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  ).populate('team', 'name avatar role department email');

  if (!project) {
    return next(new AppError('No project found with that ID or you do not have permission', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      project,
    },
  });
});

exports.deleteProject = catchAsync(async (req, res, next) => {
  const query = { _id: req.params.id };
  if (!['admin', 'Admin'].includes(req.user.role)) {
    query.owner = req.user.id;
  }

  const project = await Project.findOneAndDelete(query);

  if (!project) {
    return next(new AppError('No project found with that ID or you do not have permission to delete this project', 404));
  }

  res.status(204).send();
});
