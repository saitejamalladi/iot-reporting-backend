const { check, oneOf, validationResult } = require('express-validator');
const userService = require('../services/user');
const response = require("../utils/response");

class UserController {
	async createCustomer(req, res, next) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				res.status(400).json(response.handleValidationError(errors.array()));
				return;
			}
			let responseObj = await userService.createCustomer(req.body);
			res.status(responseObj.status_code).json(responseObj);
		} catch(err) {
			return next(err)
		}
	}
	async createSalesStaff(req, res, next) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				res.status(400).json(response.handleValidationError(errors.array()));
				return;
			}
			let responseObj = await userService.createSalesStaff(req.body);
			res.status(responseObj.status_code).json(responseObj);
		} catch(err) {
			return next(err)
		}
	}
}

module.exports = new UserController();