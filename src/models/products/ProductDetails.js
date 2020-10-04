/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ProductDetails', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1000
    },
    listing_price: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    sale_price: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    discount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: 0.00
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
    product_id: {
      type: DataTypes.STRING(256),
      allowNull: false,
      primaryKey: true,
      references: {
        model: {
          tableName: 'products',
        },
        key: 'product_id'
      }
    }
  }, {
    sequelize,
    tableName: 'product_details',
    timestamps: false
  });
};
