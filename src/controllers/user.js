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
			let responseData = await userService.createCustomer(req.body);
			res.status(200).json(response.handleSuccessResponseWithData("Registration Successful", responseData));
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
			await userService.createSalesStaff(req.body);
			res.status(200).json(response.handleSuccessResponse("Staff invitation Sent"));
		} catch(err) {
			return next(err)
		}
	}
}

module.exports = new UserController();