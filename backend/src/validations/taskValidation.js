const Joi = require('joi');

const createTaskSchema = Joi.object({
  title: Joi.string().max(100).required().messages({
    'string.empty': 'A task must have a title',
    'string.max': 'A task title must have less or equal then 100 characters',
    'any.required': 'A task must have a title',
  }),
  description: Joi.string().allow('', null).optional(),
  priority: Joi.string().valid('Low', 'Medium', 'High').optional(),
  status: Joi.string().valid('Todo', 'In Progress', 'Done').optional(),
  dueDate: Joi.date().iso().allow(null).optional().messages({
    'date.format': 'Due date must be a valid ISO date',
  }),
});

const updateTaskSchema = Joi.object({
  title: Joi.string().max(100).optional().messages({
    'string.max': 'A task title must have less or equal then 100 characters',
  }),
  description: Joi.string().allow('', null).optional(),
  priority: Joi.string().valid('Low', 'Medium', 'High').optional(),
  status: Joi.string().valid('Todo', 'In Progress', 'Done').optional(),
  dueDate: Joi.date().iso().allow(null).optional().messages({
    'date.format': 'Due date must be a valid ISO date',
  }),
}).min(1);

module.exports = {
  createTaskSchema,
  updateTaskSchema,
};
