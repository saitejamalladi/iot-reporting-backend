module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
      "role_permissions",
      {
          permission: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
          },
          rolename: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          role_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
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
        tableName: "role_permissions",
        timestamps: false,
      }
    );
  };
  