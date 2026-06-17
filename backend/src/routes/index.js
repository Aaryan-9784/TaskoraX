const express = require('express');
const authRoutes = require('./authRoutes');
const taskRoutes = require('./taskRoutes');
const userRoutes = require('./userRoutes');
const projectRoutes = require('./projectRoutes');
const teamRoutes = require('./teamRoutes');
const activityRoutes = require('./activityRoutes');
const adminRoutes = require('./adminRoutes');

const router = express.Router();

router.use('/admin', adminRoutes);
router.use('/auth', authRoutes);
router.use('/tasks', taskRoutes);
router.use('/users', userRoutes);
router.use('/projects', projectRoutes);
router.use('/team', teamRoutes);
router.use('/activities', activityRoutes);

// API Health Check
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'success', message: 'API is running optimally' });
});

module.exports = router;
