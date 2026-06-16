const express = require('express');
const teamController = require('../controllers/teamController');
const auth = require('../middleware/auth');

const router = express.Router();

router.use(auth.protect);

router
  .route('/')
  .get(teamController.getAllTeamMembers);

router
  .route('/:id')
  .put(teamController.updateTeamMember);

module.exports = router;
