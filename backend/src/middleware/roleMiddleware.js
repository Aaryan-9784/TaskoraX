const AppError = require('../utils/AppError');

exports.requireRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }
    next();
  };
};

exports.isAdmin = exports.requireRoles('Super Admin', 'superadmin', 'admin');
exports.isSuperAdmin = exports.requireRoles('Super Admin', 'superadmin');
