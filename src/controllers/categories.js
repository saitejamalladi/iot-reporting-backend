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
			let response = await categoriesService.create(req.body['name']);
			res.status(response.status_code).json(response);
		} catch(err) {
			return next(err)
		}
	}
	async listCategory(req, res, next) {
		try {
			let response = await categoriesService.list();
			res.status(response.status_code).json(response);
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
			let response = await categoriesService.get(req.params['id']);
			res.status(response.status_code).json(response);
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
			let response = await categoriesService.update(req.body);
			res.status(response.status_code).json(response);
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
			let response = await categoriesService.remove(req.params['id']);
			res.status(response.status_code).json(response);
		} catch(err) {
			return next(err)
		}
	}
}

module.exports = new CategoriesController();