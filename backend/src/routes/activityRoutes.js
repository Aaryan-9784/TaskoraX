const express = require('express');
const activityController = require('../controllers/activityController');
const auth = require('../middleware/auth');

const router = express.Router();

router.use(auth.protect);

router
  .route('/')
  .get(activityController.getAllActivities)
  .post(activityController.createActivity);

module.exports = router;
