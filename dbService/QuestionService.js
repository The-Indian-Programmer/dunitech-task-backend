'use strict';


const httpStatus = require('http-status');
const QuestionDao = require('../dao/QuestionDao');
const UserQuestionResponseDao = require('../dao/UserQuestionResponseDao');

const responsHandler = require('../helper/response');
const { logger } = require('../helper/logger');
const {  getCurrentTime } = require('../config/function');


class QuestionService {
    constructor() {
        this.questionDao = new QuestionDao();
        this.userQuestionResponseDao = new UserQuestionResponseDao();
    }


    create = async (bodyData, user) => {
        try {
            const { projectId, question, option1, option2, option3, option4, answer, points } = bodyData;

            const currectAnswer = bodyData[answer]

            const questionData = {
                projectId,
                question,
                option1,
                option2,
                option3,
                option4,
                currectAnswer,
                points,
                status: 'active',
                createdBy: user.id,
                updatedBy: user.id,
                createdAt: getCurrentTime(),
                updatedAt: getCurrentTime()
            }

            const response = await this.questionDao.create(questionData);
            if (!response) {
                return responsHandler.returnError(httpStatus.BAD_REQUEST, 'Project creation failed')
            }

            return responsHandler.returnSuccess(httpStatus.CREATED, 'Project created successfully', response);




        } catch (error) {
            logger.error('ProjectService.create', error);
            return responsHandler.returnError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
        }
    }


    getAllQuestions = async (bodyData, user) => {
        try {
            const { page = 1, perPage = 10, sort = 'id', sortOrder = 'asc', projectId } = bodyData;

            const offset = (page - 1) * perPage;
            const limit = perPage;
            const order = [[sort, sortOrder]];
            const where = { projectId }

            const response = await this.questionDao.getQuestionList({ offset, limit, order, where });

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

    submitAnswer = async (bodyData, user) => {
        try {
            const { questionId, answer} = bodyData
           
            // check questions exist
            const questionData = await this.questionDao.findOneByWhere({ id: questionId }, ['option1', 'option2', 'option3', 'option4', 'currectAnswer', 'points']);

            if (!questionData) {
                return responsHandler.returnError(httpStatus.BAD_REQUEST, 'Question not found');
            }

            const { currectAnswer } = questionData;

            const userResponseAddData = {
                questionId,
                userId: user.id,
                isCorrectAnswer: currectAnswer === answer ? 1 : 0,
                createdAt: getCurrentTime(),
                updatedAt: getCurrentTime()
            }
            const userResponseUpdateData = {
                questionId,
                userId: user.id,
                isCorrectAnswer: currectAnswer === answer ? 1 : 0,
                updatedAt: getCurrentTime()
            }

            const where= { questionId, userId: user.id }

            const response = await this.userQuestionResponseDao.addOrUpdateRecords(userResponseAddData, userResponseUpdateData, where);

            if (!response) {
                return responsHandler.returnError(httpStatus.BAD_REQUEST, 'Answer submission failed')
            }

            return responsHandler.returnSuccess(httpStatus.CREATED, 'Answer submitted successfully', response);



        } catch (error) {
            console.log(error);
            return responsHandler.returnError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
        }
    }


}

module.exports = QuestionService;