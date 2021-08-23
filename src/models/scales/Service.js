module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "Service",
    {
      service: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      companyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "service",
      timestamps: false,
    }
  );
};
