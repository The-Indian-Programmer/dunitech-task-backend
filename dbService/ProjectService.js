'use strict';


const httpStatus = require('http-status');
const ProjectDao = require('../dao/ProjectDao');
const QuestionDao = require('../dao/QuestionDao');
const responsHandler = require('../helper/response');
const { logger } = require('../helper/logger');
const { isEmpty, generateRandomString, getCurrentTime } = require('../config/function');

const expressFileupload = require('express-fileupload');
const UserQuestionsResponseDao = require('../dao/UserQuestionResponseDao');
const { Op } = require('sequelize');

class ProjectService {
    constructor() {
        this.projectDao = new ProjectDao();
        this.questionDao = new QuestionDao();
        this.userQuestionResponseDao = new UserQuestionsResponseDao();
    }


    create = async (bodyData, file, user) => {
        try {
            const { name, description, purpose } = bodyData;


            // uplaod file in public folder and get the path and save it in database
            const logo = file.file

            const extension = logo.name.split('.').pop();
            const fileName = generateRandomString(10) + '.' + extension;

            const path = 'public/uploads/' + fileName;

            logo.mv(path, function (err) {
                if (err) {
                    return responsHandler(httpStatus.INTERNAL_SERVER_ERROR, false, 'File upload failed', err);
                } 
            });

            const projectData = {
                name,
                description,
                purpose,
                logo: fileName,
                createdBy: user.id,
                updatedBy: user.id,
                createdAt: getCurrentTime(),
                updatedAt: getCurrentTime()
            }

            const response = await this.projectDao.create(projectData);
            if (!response) {
                return responsHandler.returnError(httpStatus.BAD_REQUEST, 'Project creation failed')
            }

            return responsHandler.returnSuccess(httpStatus.CREATED, 'Project created successfully', response);




        } catch (error) {
            logger.error('ProjectService.create', error);
            return responsHandler.returnError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
        }
    }


    getAllProject = async (bodyData, user) => {
        try {
            const { page = defaultPage, perPage = defaultPageLimit, sort = defaultSort, sortOrder = defaultSortOrder } = bodyData;

            const offset = (page - 1) * perPage;
            const limit = perPage;
            const order = [[sort, sortOrder]];

            const response = await this.projectDao.getProjectList({ offset, limit, order });

            if (!response) return responsHandler.returnError(httpStatus.INTERNAL_SERVER_ERROR, msgHelper.message('en', 'INTERNAL_SERVER_ERROR'));

            const { rows, count } = response;
            const responseData = {
                data: rows,
                total: count,
            }
            return responsHandler.returnSuccess(httpStatus.OK, msgHelper.message('en', 'TASK_FETCHED'), responseData);




        } catch (error) {
            console.log(error);
            return responsHandler.returnError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
        }
    }

    getResult = async (bodyData, user) => {
        try {
            const { projectId } = bodyData;

            const response = await this.questionDao.findAllByWhere({ projectId }, ['id', 'points']);

            if (!response) return responsHandler.returnError(httpStatus.INTERNAL_SERVER_ERROR, msgHelper.message('en', 'INTERNAL_SERVER_ERROR'));

            const where = {
                userId: user.id,
                questionId: {
                    [Op.in]: response.map(item => item.id)
                }
            }
            const userResponse = await this.userQuestionResponseDao.findAllByWhere(where, ['isCorrectAnswer', 'questionId']);

            if (!userResponse) {
                return responsHandler.returnError(httpStatus.INTERNAL_SERVER_ERROR, 'Not attempted yet');
            }

            const points = userResponse.reduce((acc, item) => {
                const question = response.find(q => q.id === item.questionId);
                if (item.isCorrectAnswer) {
                    return acc + question.points;
                }
                return acc;
            }

                , 0);

            return responsHandler.returnSuccess(httpStatus.OK, 'Result fetched successfully', { points });


            

        } catch (error) {
            console.log(error);
            return responsHandler.returnError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
        }
    }


}

module.exports = ProjectService;