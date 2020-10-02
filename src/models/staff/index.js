let db = require('../../config/db');
const Sequelize = require('sequelize');

db.StaffDetails = require('./StaffDetails')(db.sequelize, Sequelize.DataTypes);

module.exports = db;