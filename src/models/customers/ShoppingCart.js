/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ShoppingCart', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
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
    customer_id: {
      type: DataTypes.STRING(256),
      allowNull: false,
      primaryKey: true,
      references: {
        model: {
          tableName: 'customers',
        },
        key: 'customer_id'
      }
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
    }
  }, {
    sequelize,
    tableName: 'shopping_cart',
    timestamps: false
  });
};
