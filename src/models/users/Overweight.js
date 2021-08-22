module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "OverWeight",
    {
      timestamp: {
        type: DataTypes.DATE,
        allowNull: false,
        primaryKey: true,
      },
      binId: {
        type: DataTypes.INTEGER,
        unique: true,
      },
      weight: {
        type: DataTypes.DOUBLE,
        unique: true,
      },
    },
    {
      sequelize,
      tableName: "overweight",
      timestamps: false,
    }
  );
};
