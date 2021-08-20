module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "locations",
    {
      Location: {
        autoIncrement: true,
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      accountId: {
        type: DataTypes.INTEGER,
        unique: true,
      },
    },
    {
      sequelize,
      tableName: "location",
      timestamps: false,
    }
  );
};
