module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "Accounts",
    {
      accountId: {
        autoIncrement: true,
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      createdBy: {
        type: DataTypes.INTEGER,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      parentAccount: {
        type: DataTypes.INTEGER,
      },
      timezone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "account",
      timestamps: false,
    }
  );
};
