'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   await queryInterface.createTable('project', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    logo: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.TEXT('long'),
      allowNull: false
    },
    purpose: {
      type: Sequelize.STRING,
      allowNull: false
    },
    status: {
      type: Sequelize.ENUM('active', 'inactive', 'deleted'),
      allowNull: false,
      defaultValue: 'active'
    },
    created_by: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'admin',
        key: 'id'
      }
    },
    updated_by: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'admin',
        key: 'id'
      }
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
   });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('project');
  }
};
