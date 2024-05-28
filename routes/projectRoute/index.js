const express = require('express');
const router = express.Router();
const { createProjectValidator} = require('../../validators/ProjectValidator');

const { verifyToken } = require('../../middleware/authMiddleware');

const ProjectController = require('../../controllers/ProjectController');

const projectController = new ProjectController();


router.post('/create', verifyToken, createProjectValidator, projectController.create);
router.post('/get-all', verifyToken, projectController.getAll);


module.exports = router;