'use strict';
const { models } = require('../config/modelConfig');

const SuperDao = require('./SuperDao');

class ProjectDao extends SuperDao {
    constructor() {
        super(models.questions);
    }

    getQuestionList = async ({ offset, limit, order, where = {} }) => {
        let response = await this.model.findAndCountAll({
            where: {...where, status: 'active' },
            attributes: ['id','question', 'option1', 'option2', 'option3', 'option4', 'currectAnswer', 'points'],
            offset,
            limit,
            order
        });
        return response;

    }
}


module.exports = ProjectDao;