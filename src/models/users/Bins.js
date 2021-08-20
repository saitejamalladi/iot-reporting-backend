module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "Bins",
    {
      binId: {
        autoIncrement: true,
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      accountId: {
        type: DataTypes.INTEGER,
        unique: true,
      },
      binName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      weight: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      maxWeight: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "bins",
      timestamps: false,
    }
  );
};
