module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "BenchmarkData",
    {
      id_benchmark_data: {
        autoIncrement: true,
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      service: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      benchmark: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      account_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },
      is_deleted: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      tableName: "benchmark_data",
      timestamps: false,
    }
  );
};
