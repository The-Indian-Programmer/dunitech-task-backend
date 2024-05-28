const express = require('express');
const router = express.Router();
const { createQuestionValidator, submitAnswerValidator} = require('../../validators/QuestionValidator');

const { verifyToken } = require('../../middleware/authMiddleware');

const QuestionController = require('../../controllers/QuestionController');

const questionController = new QuestionController();


router.post('/get-all', verifyToken, questionController.getAll);
router.post('/submit', verifyToken, submitAnswerValidator, questionController.submitAnswer);


module.exports = router;