module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "ServiceWasteConfig",
    {
      id_scale_data: {
        autoIncrement: true,
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      service_waste: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      company_id: {
        type: DataTypes.INTEGER,
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
    },
    {
      sequelize,
      tableName: "service_waste_config",
      timestamps: false,
    }
  );
};
