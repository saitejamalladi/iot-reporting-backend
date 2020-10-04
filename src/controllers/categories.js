const { check, oneOf, validationResult } = require('express-validator');
const categoriesService = require('../services/categories');
const response = require("../utils/response");

class CategoriesController {
	async createCategory(req, res, next) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json(response.handleValidationError(errors.array()));
			}
			let responseObj = await categoriesService.create(req.body['name']);
			res.status(responseObj.status_code).json(responseObj);
		} catch(err) {
			return next(err)
		}
	}
	async listCategory(req, res, next) {
		try {
			let responseObj = await categoriesService.list();
			res.status(responseObj.status_code).json(responseObj);
		} catch(err) {
			return next(err)
		}
	}
	async getCategory(req, res, next) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json(response.handleValidationError(errors.array()));
			}
			let responseObj = await categoriesService.get(req.params['id']);
			res.status(responseObj.status_code).json(responseObj);
		} catch(err) {
			return next(err)
		}
	}
	async updateCategory(req, res, next) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json(response.handleValidationError(errors.array()));
			}
			let responseObj = await categoriesService.update(req.body);
			res.status(responseObj.status_code).json(responseObj);
		} catch(err) {
			return next(err)
		}
	}
	async removeCategory(req, res, next) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json(response.handleValidationError(errors.array()));
			}
			let responseObj = await categoriesService.remove(req.params['id']);
			res.status(responseObj.status_code).json(responseObj);
		} catch(err) {
			return next(err)
		}
	}
}

module.exports = new CategoriesController();