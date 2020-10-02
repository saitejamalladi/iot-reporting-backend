let db = require('../../config/db');
const Sequelize = require('sequelize');

db.CustomerCards = require('./CustomerCards')(db.sequelize, Sequelize.DataTypes);
db.Customers = require('./Customers')(db.sequelize, Sequelize.DataTypes);
db.ShoppingCart = require('./ShoppingCart')(db.sequelize, Sequelize.DataTypes);
db.ShoppingCartItems = require('./ShoppingCartItems')(db.sequelize, Sequelize.DataTypes);

module.exports = db;