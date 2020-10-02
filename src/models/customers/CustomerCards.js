/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('CustomerCards', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    card_number: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    expiry_year: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    expiry_month: {
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
    }
  }, {
    sequelize,
    tableName: 'customer_cards',
    timestamps: false
  });
};
