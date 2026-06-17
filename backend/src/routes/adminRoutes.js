const express = require('express');
const adminController = require('../controllers/adminController');
const { verifyToken } = require('../middleware/authMiddleware');
const { isAdmin } = require('../middleware/roleMiddleware');

const router = express.Router();

// Apply auth and RBAC middlewares to all admin routes
router.use(verifyToken);
router.use(isAdmin);

// Dashboard & Analytics
router.get('/dashboard', adminController.getDashboardStats);
router.get('/analytics', adminController.getAnalytics);

// User Management
router
  .route('/users')
  .get(adminController.getUsers)
  .post(adminController.createUser);

router
  .route('/users/:id')
  .get(adminController.getUserDetails)
  .put(adminController.updateUser)
  .delete(adminController.deleteUser);

router.patch('/users/:id/activate', adminController.activateUser);
router.patch('/users/:id/deactivate', adminController.deactivateUser);

// Task Management
router
  .route('/tasks')
  .get(adminController.getTasks);

router
  .route('/tasks/:id')
  .get(adminController.getTaskDetails)
  .delete(adminController.deleteTask);

router.patch('/tasks/:id/status', adminController.updateTaskStatus);

// Activity Logs
router.get('/activity-logs', adminController.getActivityLogs);

module.exports = router;
