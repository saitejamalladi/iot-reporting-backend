let db = require('../../config/db');
const Sequelize = require('sequelize');

db.Categories = require('./Categories')(db.sequelize, Sequelize.DataTypes);
db.ProductCategories = require('./')(db.sequelize, Sequelize.DataTypes);
db.ProductDetails = require('./ProductDetails')(db.sequelize, Sequelize.DataTypes);
db.ProductFavourites = require('./ProductFavourites')(db.sequelize, Sequelize.DataTypes);
db.Products = require('./Products')(db.sequelize, Sequelize.DataTypes);

module.exports = db;