module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "users",
    {
      accountId: {
        autoIncrement: true,
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      companyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address2: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      parentId: {
        type: DataTypes.INTEGER,
      },
      accountStatus: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      tableName: "users",
      timestamps: false,
    }
  );
};
