/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Orders', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    order_id: {
      type: DataTypes.STRING(256),
      allowNull: false,
      unique: true
    },
    total_amount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: 0.00
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      primaryKey: true
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      primaryKey: true
    },
    is_deleted: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    customer_id: {
      type: DataTypes.STRING(256),
      allowNull: false,
      references: {
        model: {
          tableName: 'customers',
        },
        key: 'customer_id'
      }
    },
    billing_address_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: {
          tableName: 'billing_addresses',
        },
        key: 'id'
      }
    },
    payment_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: {
          tableName: 'payments',
        },
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'orders',
    timestamps: false
  });
};
