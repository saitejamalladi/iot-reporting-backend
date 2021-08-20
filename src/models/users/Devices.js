module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "devices",
    {
      deviceId: {
        autoIncrement: true,
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      accountId: {
        type: DataTypes.INTEGER,
        unique: true,
      },
    },
    {
      sequelize,
      tableName: "device",
      timestamps: false,
    }
  );
};
