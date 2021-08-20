module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "MealCount",
    {
      timestamp: {
        autoIncrement: true,
        type: DataTypes.DATE,
        allowNull: false,
        primaryKey: true,
      },
      siteAreaId: {
        type: DataTypes.INTEGER,
        unique: true,
      },
      service: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      amountServiced: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "mealcount",
      timestamps: false,
    }
  );
};
