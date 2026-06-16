const express = require('express');
const projectController = require('../controllers/projectController');
const auth = require('../middleware/auth');

const router = express.Router();

router.use(auth.protect);

router
  .route('/')
  .get(projectController.getAllProjects)
  .post(projectController.createProject);

router
  .route('/:id')
  .get(projectController.getProject)
  .put(projectController.updateProject)
  .delete(projectController.deleteProject);

module.exports = router;
