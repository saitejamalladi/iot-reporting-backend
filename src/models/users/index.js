let db = require("../../config/db");
const Sequelize = require("sequelize");

db.AppClients = require("./AppClients")(db.sequelize, Sequelize.DataTypes);
db.UserCredentials = require("./UserCredentials")(
  db.sequelize,
  Sequelize.DataTypes
);

module.exports = db;
