module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "categories",
    {
      categorys: {
        autoIncrement: true,
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      companyId: {
        type: DataTypes.INTEGER,
        unique: true,
      },
    },
    {
      sequelize,
      tableName: "category",
      timestamps: false,
    }
  );
};
