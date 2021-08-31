module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "ScaleData",
    {
      id_scale_data: {
        autoIncrement: true,
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      scale_id: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      gross_weight: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      net_weight: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      bin_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      service: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      sub_category1: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      sub_category2: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      service_waste: {
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
      tableName: "scale_data",
      timestamps: false,
    }
  );
};
