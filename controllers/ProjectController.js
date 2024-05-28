'use strict';

const httpStatus = require('http-status');

const ProejctService = require('../dbService/ProjectService');
class ProjectController {
    constructor() { 
        this.projectService = new ProejctService();
    }

    create = async (req, res) => {
        try {
            const formData = req.body;
            const file = req.files
            const response = await this.projectService.create(formData, file, req.user);
            
            return res.status(response.code).json(response);
        } catch (error) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ status: false, message:  error.message });
        }
    }

    
    

    getAll = async (req, res) => {
        try {
            const formData = req.body;
            const response = await this.projectService.getAllProject(formData, req.user);
            
            return res.status(response.code).json(response);
        } catch (error) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ status: false, message:  error.message });
        }
    }

    getResult = async (req, res) => {
        try {
            const formData = req.body;
            const response = await this.projectService.getResult(formData, req.user);
            
            return res.status(response.code).json(response);
        } catch (error) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ status: false, message:  error.message });
        }
    }

    

}

module.exports = ProjectController;