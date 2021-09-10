let db = require("../../config/db");
const Sequelize = require("sequelize");

db.RegisteredDevices = require("./RegisteredDevices")(
  db.sequelize,
  Sequelize.DataTypes
);

db.Scales = require("./Scales")(db.sequelize, Sequelize.DataTypes);
db.ScaleData = require("./ScaleData")(db.sequelize, Sequelize.DataTypes);
db.Service = require("./Service")(db.sequelize, Sequelize.DataTypes);
db.Location = require("./Location")(db.sequelize, Sequelize.DataTypes);
db.ServiceWasteConfig = require("./ServiceWasteConfig")(
  db.sequelize,
  Sequelize.DataTypes
);

db.RegisteredDevices.hasMany(db.Scales, {
  as: "RegisteredDevices",
  foreignKey: "device_id",
});
db.Scales.belongsTo(db.RegisteredDevices, { foreignKey: "device_id" });

module.exports = db;
