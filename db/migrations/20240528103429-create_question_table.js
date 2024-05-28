'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   await queryInterface.createTable('questions', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    project_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'project',
        key: 'id'
      }
    },
    question: {
      type: Sequelize.STRING,
      allowNull: false
    },
    option_1: {
      type: Sequelize.STRING,
      allowNull: false
    },
    option_2: {
      type: Sequelize.STRING,
      allowNull: false
    },
    option_3: {
      type: Sequelize.STRING,
      allowNull: false
    },
    option_4: {
      type: Sequelize.STRING,
      allowNull: false
    },
    currect_answer: {
      type: Sequelize.STRING,
      allowNull: false
    },
    points: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1,
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
    return queryInterface.dropTable('questions');
  }
};
