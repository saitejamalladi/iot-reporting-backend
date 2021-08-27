module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "Service",
    {
      service: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      company_id: {
        type: DataTypes.STRING,
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
