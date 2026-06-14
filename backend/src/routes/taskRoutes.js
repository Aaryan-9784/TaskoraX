const express = require('express');
const taskController = require('../controllers/taskController');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const { createTaskSchema, updateTaskSchema } = require('../validations/taskValidation');

const router = express.Router();

// Protect all routes after this middleware
router.use(auth.protect);

router
  .route('/')
  .get(taskController.getAllTasks)
  .post(validate(createTaskSchema), taskController.createTask);

router
  .route('/:id')
  .get(taskController.getTask)
  .put(validate(updateTaskSchema), taskController.updateTask)
  .delete(taskController.deleteTask);

module.exports = router;
