let db = require("../../config/db");
const Sequelize = require("sequelize");

db.Users = require("./Users")(db.sequelize, Sequelize.DataTypes);
db.UserRoles = require("./UserRoles")(db.sequelize, Sequelize.DataTypes);

module.exports = db;
