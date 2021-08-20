module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "UserRoles",
    {
      accountId: {
        autoIncrement: true,
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      roleName: {
        type: DataTypes.STRING,
        unique: true,
      },
    },
    {
      sequelize,
      tableName: "userroles",
      timestamps: false,
    }
  );
};
