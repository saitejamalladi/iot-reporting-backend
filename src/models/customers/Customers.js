/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "Customers",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      customer_id: {
        type: DataTypes.STRING(256),
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.STRING(256),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      phone_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      country_code: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 91,
      },
      timezone: {
        type: DataTypes.STRING(100),
        allowNull: false,
        defaultValue: "Asia/Kolkata",
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },
      is_deleted: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        unique: true,
      },
      user_id: {
        type: DataTypes.STRING(256),
        allowNull: false,
        references: {
          model: {
            tableName: "user_credentials",
          },
          key: "user_id",
        },
      },
    },
    {
      sequelize,
      tableName: "customers",
      timestamps: false,
    }
  );
};
