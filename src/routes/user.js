const express = require('express');
const router = express.Router();
const authMiddleware = require('./middlewares/auth');
const userMiddleware = require('./middlewares/user');
const userController = require('../controllers/user');
const constants = require('../constants');

router.post(
	'/create',
	authMiddleware.verifyBasicAuthentication,
	userMiddleware.validate(constants.USER.CREATE),
	userController.createCustomer
);
router.post(
	'/create/staff',
	authMiddleware.verifyBearerToken,
	userMiddleware.validate(constants.USER.CREATE),
	userController.createSalesStaff
);
module.exports = router;
