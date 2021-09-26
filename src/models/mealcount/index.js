let db = require("../../config/db");
const Sequelize = require("sequelize");

db.MealCountData = require("./MealCountData")(db.sequelize, Sequelize.DataTypes);
db.BenchmarkData = require("./BenchmarkData")(db.sequelize, Sequelize.DataTypes);

module.exports = db;
