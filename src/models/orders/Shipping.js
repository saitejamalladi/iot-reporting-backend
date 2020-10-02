/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Shipping', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    shipping_id: {
      type: DataTypes.STRING(256),
      allowNull: false,
      unique: true
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    estimated_delivery_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    actual_delivery_date: {
      type: DataTypes.DATE,
      allowNull: true
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
    contact_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: {
          tableName: 'contacts',
        },
        key: 'id'
      }
    },
    orders_id: {
      type: DataTypes.STRING(256),
      allowNull: false,
      references: {
        model: {
          tableName: 'orders',
        },
        key: 'order_id'
      }
    }
  }, {
    sequelize,
    tableName: 'shipping',
    timestamps: false
  });
};
