const AppError = require('../utils/AppError');

exports.requireRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.map(r => r.toLowerCase()).includes((req.user.role || '').toLowerCase())) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }
    next();
  };
};

exports.isAdmin = exports.requireRoles('admin', 'Admin');
exports.isManager = exports.requireRoles('admin', 'Admin', 'manager', 'Manager');

