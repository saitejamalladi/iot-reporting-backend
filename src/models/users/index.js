let db = require("../../config/db");
const Sequelize = require("sequelize");

db.Companies = require("./Companies")(db.sequelize, Sequelize.DataTypes);
db.Accounts = require("./Accounts")(db.sequelize, Sequelize.DataTypes);
db.Permissions = require("./Permissions")(db.sequelize, Sequelize.DataTypes);
db.Users = require("./Users")(db.sequelize, Sequelize.DataTypes);

db.Accounts.hasMany(db.Users, {
  as: "Accounts",
  foreignKey: "account_id",
});
db.Users.belongsTo(db.Accounts, { foreignKey: "account_id" });

module.exports = db;
