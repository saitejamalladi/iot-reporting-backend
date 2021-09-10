module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
      "location",
      {
        location: {
          type: DataTypes.STRING,
          allowNull: false,
          primaryKey: true,
        },
        account_id: {
          type: DataTypes.STRING,
          allowNull: false,
          primaryKey: true
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
        tableName: "location",
        timestamps: false,
      }
    );
  };
  