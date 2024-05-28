const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('questions', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    projectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'project',
        key: 'id'
      },
      field: 'project_id'
    },
    question: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    option1: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'option_1'
    },
    option2: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'option_2'
    },
    option3: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'option_3'
    },
    option4: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'option_4'
    },
    currectAnswer: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'currect_answer'
    },
    points: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    status: {
      type: DataTypes.ENUM('active','inactive','deleted'),
      allowNull: false,
      defaultValue: "active"
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'admin',
        key: 'id'
      },
      field: 'created_by'
    },
    updatedBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'admin',
        key: 'id'
      },
      field: 'updated_by'
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      field: 'created_at'
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      field: 'updated_at'
    }
  }, {
    sequelize,
    tableName: 'questions',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "project_id",
        using: "BTREE",
        fields: [
          { name: "project_id" },
        ]
      },
      {
        name: "created_by",
        using: "BTREE",
        fields: [
          { name: "created_by" },
        ]
      },
      {
        name: "updated_by",
        using: "BTREE",
        fields: [
          { name: "updated_by" },
        ]
      },
    ]
  });
};
