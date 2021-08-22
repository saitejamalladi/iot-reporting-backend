module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "Scales",
    {
      scaleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      deviceId: {
        type: DataTypes.STRING,
        unique: true,
      },
      scaleName: {
        type: DataTypes.STRING,
        unique: true,
      },
      scaleSerial: {
        type: DataTypes.STRING,
        unique: true,
      },
    },
    {
      sequelize,
      tableName: "scaleData",
      timestamps: false,
    }
  );
};
