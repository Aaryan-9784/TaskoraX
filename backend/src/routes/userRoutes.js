const express = require('express');
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

const router = express.Router();

// Protect all routes after this middleware
router.use(auth.protect);

router.get('/me', userController.getMe, userController.getUser);
router.put('/me', userController.updateMe);
router.put('/updateMyPassword', userController.updatePassword);
router.patch('/deactivate', userController.deactivateAccount);
router.delete('/delete', userController.deleteAccount);
router.get('/sessions', userController.getSessions);
router.delete('/sessions/:sessionId', userController.revokeSession);

module.exports = router;
