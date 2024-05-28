'use strict';
const { models } = require('../config/modelConfig');

const SuperDao = require('./SuperDao');

class UserQuestionsResponseDao extends SuperDao {
    constructor() {
        super(models.userQuestionResponse);
    }
}


module.exports = UserQuestionsResponseDao;