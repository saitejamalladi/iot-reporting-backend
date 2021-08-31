let db = require("../../config/db");
const Sequelize = require("sequelize");

db.Bins = require("./Bins")(db.sequelize, Sequelize.DataTypes);

module.exports = db;
