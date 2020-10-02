'use strict';

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('ProductFavourites', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false
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
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'CUSTOMERS',
        },
        key: 'id'
      }
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'PRODUCTS',
        },
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'PRODUCT_FAVOURITES',
    timestamps: false
  });
};
