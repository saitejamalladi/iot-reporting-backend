/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Payments', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    payment_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    is_deleted: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    transaction_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: {
          tableName: 'transactions',
        },
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'payments',
    timestamps: false
  });
};
