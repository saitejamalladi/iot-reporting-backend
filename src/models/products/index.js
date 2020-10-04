let db = require('../../config/db');
const Sequelize = require('sequelize');

db.Categories = require('./Categories')(db.sequelize, Sequelize.DataTypes);
db.ProductCategories = require('./ProductCategories')(db.sequelize, Sequelize.DataTypes);
db.ProductDetails = require('./ProductDetails')(db.sequelize, Sequelize.DataTypes);
db.ProductFavourites = require('./ProductFavourites')(db.sequelize, Sequelize.DataTypes);
db.Products = require('./Products')(db.sequelize, Sequelize.DataTypes);


db.Products.hasMany(db.ProductDetails, {as: 'product_details', sourceKey: 'product_id', foreignKey: 'product_id'});
db.Products.hasMany(db.ProductCategories, {as: 'categories', sourceKey: 'product_id', foreignKey: 'product_id'});


module.exports = db;