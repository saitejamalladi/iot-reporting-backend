/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Products', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    product_id: {
      type: DataTypes.STRING(256),
      allowNull: false,
      unique: true
    },
    name: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(4000),
      allowNull: true
    },
    thumbnail_url: {
      type: DataTypes.STRING(4000),
      allowNull: true,
      defaultValue: "null"
    },
    rating: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: 0.00
    },
    display_priority: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    sales_count: {
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
    }
  }, {
    sequelize,
    tableName: 'products',
    timestamps: false
  });
};
