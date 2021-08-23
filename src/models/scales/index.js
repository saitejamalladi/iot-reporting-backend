let db = require("../../config/db");
const Sequelize = require("sequelize");

db.Scales = require("./Scales")(db.sequelize, Sequelize.DataTypes);
db.ScaleData = require("./ScaleData")(db.sequelize, Sequelize.DataTypes);
db.Service = require("./Service")(db.sequelize, Sequelize.DataTypes);
db.ServiceWasteConfig = require("./ServiceWasteConfig")(db.sequelize, Sequelize.DataTypes);

module.exports = db;
