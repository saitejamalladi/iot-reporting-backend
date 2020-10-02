/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BillingAddresses', {
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
    address_1: {
      type: DataTypes.STRING(4000),
      allowNull: false
    },
    address_2: {
      type: DataTypes.STRING(4000),
      allowNull: true
    },
    address_3: {
      type: DataTypes.STRING(4000),
      allowNull: true
    },
    phone_number: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    pincode: {
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
    }
  }, {
    sequelize,
    tableName: 'billing_addresses',
    timestamps: false
  });
};
