module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "Companies",
    {
      companyId: {
        autoIncrement: true,
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      companyName: {
        type: DataTypes.STRING,
        unique: true,
      },
    },
    {
      sequelize,
      tableName: "company",
      timestamps: false,
    }
  );
};
