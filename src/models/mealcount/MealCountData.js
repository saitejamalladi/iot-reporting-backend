module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "MealCountData",
    {
      id_meal_count_data: {
        autoIncrement: true,
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      meal_count_id: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      meal_count_type: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      total_count: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      account_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      service: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      modified_by: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      report_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
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
      tableName: "meal_count_data",
      timestamps: false,
    }
  );
};
