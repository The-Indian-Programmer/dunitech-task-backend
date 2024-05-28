'use strict';
const { models } = require('../config/modelConfig');

const SuperDao = require('./SuperDao');

class UsersDao extends SuperDao {
    constructor() {
        super(models.admin);
    }
}


module.exports = UsersDao;