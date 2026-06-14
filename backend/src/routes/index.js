const express = require('express');
const authRoutes = require('./authRoutes');
const taskRoutes = require('./taskRoutes');
const userRoutes = require('./userRoutes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/tasks', taskRoutes);
router.use('/users', userRoutes);

// API Health Check
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'success', message: 'API is running optimally' });
});

module.exports = router;
