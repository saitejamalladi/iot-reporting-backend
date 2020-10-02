/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('OrderItems', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
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
    order_id: {
      type: DataTypes.STRING(256),
      allowNull: false,
      references: {
        model: {
          tableName: 'orders',
        },
        key: 'order_id'
      }
    },
    product_detail_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: {
          tableName: 'product_details',
        },
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'order_items',
    timestamps: false
  });
};
