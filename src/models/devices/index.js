let db = require("../../config/db");
const Sequelize = require("sequelize");

db.RegisteredDevices = require("./RegisteredDevices")(
  db.sequelize,
  Sequelize.DataTypes
);

module.exports = db;
