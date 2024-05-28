const express = require('express');
const router = express.Router();
const { createQuestionValidator, submitAnswerValidator} = require('../../validators/QuestionValidator');

const { verifyToken } = require('../../middleware/authMiddleware');

const ProjectController = require('../../controllers/ProjectController');
const projectController = new ProjectController();

router.post('/result', verifyToken, projectController.getResult);


module.exports = router;