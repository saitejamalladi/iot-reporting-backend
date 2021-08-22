let db = require("../../config/db");
const Sequelize = require("sequelize");

db.Scales = require("./Scales")(db.sequelize, Sequelize.DataTypes);

module.exports = db;
