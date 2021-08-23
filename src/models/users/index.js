let db = require("../../config/db");
const Sequelize = require("sequelize");

db.Users = require("./Users")(db.sequelize, Sequelize.DataTypes);
db.UserRoles = require("./UserRoles")(db.sequelize, Sequelize.DataTypes);

db.Accounts = require("./Accounts")(db.sequelize, Sequelize.DataTypes);
db.AccountRoles = require("./AccountRoles")(db.sequelize, Sequelize.DataTypes);

db.Bins = require("../bins/Bins")(db.sequelize, Sequelize.DataTypes);
db.Categories = require("./Categories")(db.sequelize, Sequelize.DataTypes);

db.Companies = require("./Companies")(db.sequelize, Sequelize.DataTypes);
db.Devices = require("./Devices")(db.sequelize, Sequelize.DataTypes);

db.Locations = require("./Locations")(db.sequelize, Sequelize.DataTypes);
db.MealCount = require("./MealCount")(db.sequelize, Sequelize.DataTypes);

module.exports = db;
