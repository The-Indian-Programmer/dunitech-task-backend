'use strict';


const { hashPassword } = require('../../config/function');

module.exports = {
  up: async (queryInterface, Sequelize) => {
   await queryInterface.bulkInsert('admin', [{
      email: 'admin@dunitech.com',
      password: hashPassword('Dunitech@123'),
      createdAt: new Date(),
      updatedAt: new Date()
   }]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('admin', null, {});
  }
};
