const Joi = require('joi');

const registerSchema = Joi.object({
  name: Joi.string().max(50).required().messages({
    'string.empty': 'Please provide your name',
    'string.max': 'Name cannot be more than 50 characters',
    'any.required': 'Please provide your name',
  }),
  email: Joi.string().email().required().messages({
    'string.empty': 'Please provide your email',
    'string.email': 'Please provide a valid email address',
    'any.required': 'Please provide your email',
  }),
  password: Joi.string().min(6).required().messages({
    'string.empty': 'Please provide a password',
    'string.min': 'Password must be at least 6 characters',
    'any.required': 'Please provide a password',
  }),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.empty': 'Please provide your email',
    'string.email': 'Please provide a valid email address',
    'any.required': 'Please provide your email',
  }),
  password: Joi.string().required().messages({
    'string.empty': 'Please provide your password',
    'any.required': 'Please provide your password',
  }),
});

module.exports = {
  registerSchema,
  loginSchema,
};
