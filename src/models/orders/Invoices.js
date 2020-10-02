/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Invoices', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    content: {
      type: 'BLOB',
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
    order_id: {
      type: DataTypes.STRING(256),
      allowNull: false,
      primaryKey: true,
      references: {
        model: {
          tableName: 'orders',
        },
        key: 'order_id'
      }
    }
  }, {
    sequelize,
    tableName: 'invoices',
    timestamps: false
  });
};
