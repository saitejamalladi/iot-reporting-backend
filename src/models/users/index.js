let db = require("../../config/db");
const Sequelize = require("sequelize");

db.Companies = require("./Companies")(db.sequelize, Sequelize.DataTypes);
db.Accounts = require("./Accounts")(db.sequelize, Sequelize.DataTypes);
db.Users = require("./Users")(db.sequelize, Sequelize.DataTypes);

module.exports = db;
