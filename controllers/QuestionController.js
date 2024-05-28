'use strict';

const httpStatus = require('http-status');

const QuestionService = require('../dbService/QuestionService');
class ProjectController {
    constructor() { 
        this.questionService = new QuestionService();
    }

    create = async (req, res) => {
        try {
            const formData = req.body;
            const response = await this.questionService.create(formData, req.user);
            
            return res.status(response.code).json(response);
        } catch (error) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ status: false, message:  error.message });
        }
    }

    
    

    getAll = async (req, res) => {
        try {
            const formData = req.body;
            const response = await this.questionService.getAllQuestions(formData, req.user);
            
            return res.status(response.code).json(response);
        } catch (error) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ status: false, message:  error.message });
        }
    }

    submitAnswer = async (req, res) => {
        try {
            const formData = req.body;
            const response = await this.questionService.submitAnswer(formData, req.user);
            
            return res.status(response.code).json(response);
        } catch (error) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ status: false, message:  error.message });
        }
    }

    

}

module.exports = ProjectController;