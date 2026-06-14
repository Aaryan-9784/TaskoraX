const AppError = require('../utils/AppError');

const validate = (schema) => (req, res, next) => {
  const { value, error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    const errorMessage = error.details.map((details) => details.message).join(', ');
    return next(new AppError(errorMessage, 400));
  }

  // Assign validated values back to req.body
  Object.assign(req.body, value);
  return next();
};

module.exports = validate;
