const express = require('express');
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

const router = express.Router();

// Protect all routes after this middleware
router.use(auth.protect);

router.get('/me', userController.getMe, userController.getUser);
router.put('/me', userController.updateMe);
router.put('/updateMyPassword', userController.updatePassword);

module.exports = router;
