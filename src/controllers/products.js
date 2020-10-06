const { check, oneOf, validationResult } = require('express-validator');
const productsService = require('../services/products');
const response = require("../utils/response");

class ProductsController {
	async createProduct(req, res, next) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json(response.handleValidationError(errors.array()));
			}
			let responseObj = await productsService.create(req.body);
			res.status(responseObj.status_code).json(responseObj);
		} catch(err) {
			return next(err)
		}
	}
	async listProduct(req, res, next) {
		try {
			let responseObj = await productsService.list();
			res.status(responseObj.status_code).json(responseObj);
		} catch(err) {
			return next(err)
		}
	}
	async searchProduct(req, res, next) {
		try {
			let responseObj = await productsService.search(req.params['item']);
			res.status(responseObj.status_code).json(responseObj);
		} catch(err) {
			return next(err)
		}
	}
	async getProduct(req, res, next) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json(response.handleValidationError(errors.array()));
			}
			let responseObj = await productsService.get(req.params['product_id']);
			res.status(responseObj.status_code).json(responseObj);
		} catch(err) {
			return next(err)
		}
	}
	async updateProduct(req, res, next) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json(response.handleValidationError(errors.array()));
			}
			let responseObj = await productsService.update(req.body);
			res.status(responseObj.status_code).json(responseObj);
		} catch(err) {
			return next(err)
		}
	}
	async removeProduct(req, res, next) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json(response.handleValidationError(errors.array()));
			}
			let responseObj = await productsService.remove(req.params['product_id']);
			res.status(responseObj.status_code).json(responseObj);
		} catch(err) {
			return next(err)
		}
	}
	async updateQuantity(req, res, next) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json(response.handleValidationError(errors.array()));
			}
			let responseObj = await productsService.updateQuantity(req.body);
			res.status(responseObj.status_code).json(responseObj);
		} catch(err) {
			return next(err)
		}
	}
	async removeQuantity(req, res, next) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json(response.handleValidationError(errors.array()));
			}
			let responseObj = await productsService.removeQuantity(req.body);
			res.status(responseObj.status_code).json(responseObj);
		} catch(err) {
			return next(err)
		}
	}
	async addCategory(req, res, next) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json(response.handleValidationError(errors.array()));
			}
			let responseObj = await productsService.addCategory(req.body['product_id'], req.body['category_id']);
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
			let responseObj = await productsService.removeCategory(req.body['product_id'], req.body['category_id']);
			res.status(responseObj.status_code).json(responseObj);
		} catch(err) {
			return next(err)
		}
	}
}

module.exports = new ProductsController();