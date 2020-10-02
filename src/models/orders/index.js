let db = require('../../config/db');
const Sequelize = require('sequelize');

db.Invoices = require('./Invoices')(db.sequelize, Sequelize.DataTypes);
db.BillingAddresses = require('./BillingAddresses')(db.sequelize, Sequelize.DataTypes);
db.OrderItems = require('./OrderItems')(db.sequelize, Sequelize.DataTypes);
db.Orders = require('./Orders')(db.sequelize, Sequelize.DataTypes);
db.Payments = require('./Payments')(db.sequelize, Sequelize.DataTypes);
db.Shipping = require('./Shipping')(db.sequelize, Sequelize.DataTypes);
db.Transactions = require('./Transactions')(db.sequelize, Sequelize.DataTypes);

module.exports = db;