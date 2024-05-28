'use strict';
const { models } = require('../config/modelConfig');

const SuperDao = require('./SuperDao');

class ProjectDao extends SuperDao {
    constructor() {
        super(models.project);
    }

    getProjectList = async ({ offset, limit, order }) => {
        let response = await this.model.findAndCountAll({
            where: { status: 'active' },
            attributes: ['id','name', 'description','logo', 'purpose', 'createdAt'],
            offset,
            limit,
            order
        });
        return response;

    }
}


module.exports = ProjectDao;