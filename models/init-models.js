var DataTypes = require("sequelize").DataTypes;
var _sequelizeMeta = require("./sequelizeMeta");
var _admin = require("./admin");
var _project = require("./project");
var _questions = require("./questions");
var _tasks = require("./tasks");
var _userQuestionResponse = require("./userQuestionResponse");
var _users = require("./users");

function initModels(sequelize) {
  var sequelizeMeta = _sequelizeMeta(sequelize, DataTypes);
  var admin = _admin(sequelize, DataTypes);
  var project = _project(sequelize, DataTypes);
  var questions = _questions(sequelize, DataTypes);
  var tasks = _tasks(sequelize, DataTypes);
  var userQuestionResponse = _userQuestionResponse(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  project.belongsTo(admin, { as: "createdByAdmin", foreignKey: "createdBy"});
  admin.hasMany(project, { as: "projects", foreignKey: "createdBy"});
  project.belongsTo(admin, { as: "updatedByAdmin", foreignKey: "updatedBy"});
  admin.hasMany(project, { as: "updatedByProjects", foreignKey: "updatedBy"});
  questions.belongsTo(admin, { as: "createdByAdmin", foreignKey: "createdBy"});
  admin.hasMany(questions, { as: "questions", foreignKey: "createdBy"});
  questions.belongsTo(admin, { as: "updatedByAdmin", foreignKey: "updatedBy"});
  admin.hasMany(questions, { as: "updatedByQuestions", foreignKey: "updatedBy"});
  questions.belongsTo(project, { as: "project", foreignKey: "projectId"});
  project.hasMany(questions, { as: "questions", foreignKey: "projectId"});
  userQuestionResponse.belongsTo(questions, { as: "question", foreignKey: "questionId"});
  questions.hasMany(userQuestionResponse, { as: "userQuestionResponses", foreignKey: "questionId"});
  tasks.belongsTo(users, { as: "user", foreignKey: "userId"});
  users.hasMany(tasks, { as: "tasks", foreignKey: "userId"});
  tasks.belongsTo(users, { as: "createdByUser", foreignKey: "createdBy"});
  users.hasMany(tasks, { as: "createdByTasks", foreignKey: "createdBy"});
  tasks.belongsTo(users, { as: "updatedByUser", foreignKey: "updatedBy"});
  users.hasMany(tasks, { as: "updatedByTasks", foreignKey: "updatedBy"});
  userQuestionResponse.belongsTo(users, { as: "user", foreignKey: "userId"});
  users.hasMany(userQuestionResponse, { as: "userQuestionResponses", foreignKey: "userId"});

  return {
    sequelizeMeta,
    admin,
    project,
    questions,
    tasks,
    userQuestionResponse,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
