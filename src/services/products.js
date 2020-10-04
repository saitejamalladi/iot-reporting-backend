const ProductsModel = require('../models/products').Products;
const ProductCategoriesModel = require('../models/products').ProductCategories;
const ProductDetailsModel = require('../models/products').ProductDetails;
const RandomKeyService = require('./randomKey');
const response = require("../utils/response");

class ProductsService {
	async create(productObj) {
		let productId = "product_" + await RandomKeyService.generate(10);
		await ProductsModel.create({
			product_id: productId,
			name: productObj['name'],
			description: productObj['description'],
			thumbnail_url: productObj['thumbnail_url'],
			display_priority: productObj['display_priority'],
		});
		let productCategories = productObj['category_ids'].map(categoryId => {
			return {
				category_id: categoryId,
				product_id: productId,
			}
		});
		await ProductCategoriesModel.bulkCreate(productCategories);
		let productDetails = productObj['product_details'].map(detail => {
			return {
				product_id: productId,
				quantity: detail['quantity'],
				measuring_units: detail['measuring_units'],
				listing_price: detail['listing_price'],
				sale_price: detail['sale_price'],
				discount: detail['discount']
			}
		});
		await ProductDetailsModel.bulkCreate(productDetails);
		let productResObj = {
			product_id: productId
		};
		return response.handleSuccessResponseWithData("Product created", productResObj);
	}
	async list() {
		let productList = await ProductsModel.findAll({
			where: {
				is_deleted: false
			},
			attributes: ['product_id', 'name', 'description', 'thumbnail_url', 'display_priority'],
			include: [{
				model: ProductDetailsModel,
				as: "product_details",
				where: {
					is_deleted: false
				},
				attributes: ['quantity', 'measuring_units', 'listing_price', 'sale_price', 'discount'],
				raw: true
			}, {
				model: ProductCategoriesModel,
				as: 'categories',
				where: {
					is_deleted: false
				},
				attributes: ['category_id'],
				raw: true
			}
			],
			order: [['display_priority',  'DESC'], ['name',  'ASC'], ['id',  'DESC']],
			limit: 100
		});
		productList = JSON.parse(JSON.stringify(productList));
		if(productList && productList.length > 0) {
			productList.forEach(product => {
				product['categories'] = product['categories'].map(category => category['category_id']);
			})
		}
		return response.handleSuccessResponseWithData("Product list", productList);
	}
	async get(productId) {
		let productInfo = await ProductsModel.findOne({
			where: {
				product_id: productId,
				is_deleted: false
			},
			attributes: ['product_id', 'name', 'description', 'thumbnail_url', 'display_priority'],
			include: [{
				model: ProductDetailsModel,
				as: "product_details",
				where: {
					is_deleted: false
				},
				attributes: ['quantity', 'measuring_units', 'listing_price', 'sale_price', 'discount'],
				raw: true
			}, {
				model: ProductCategoriesModel,
				as: 'categories',
				where: {
					is_deleted: false
				},
				attributes: ['category_id'],
				raw: true
			}
			],
			order: [['display_priority',  'DESC'], ['name',  'ASC'], ['id',  'DESC']],
			limit: 100
		});
		productInfo = JSON.parse(JSON.stringify(productInfo));
		if(productInfo) {
			productInfo['categories'] = productInfo['categories'].map(category => category['category_id']);
		}
		return response.handleSuccessResponseWithData("Product info", productInfo);
	}
	async update(productObj) {
		await ProductsModel.update({
			name: productObj['name'],
			description: productObj['description'],
			thumbnail_url: productObj['thumbnail_url'],
			display_priority: productObj['display_priority']
		}, {
			where: {
				product_id: productObj['product_id'],
				is_deleted: false
			}
		});
		return response.handleSuccessResponse("Product updated");
	}
	async remove(productId) {
		await ProductsModel.update({
			is_deleted: true
		}, {
			where: {
				product_id: productId,
				is_deleted: false
			}
		});
		await ProductCategoriesModel.update({
			is_deleted: true
		}, {
			where: {
				product_id: productId,
				is_deleted: false
			}
		});
		await ProductCategoriesModel.update({
			is_deleted: true
		}, {
			where: {
				product_id: productId,
				is_deleted: false
			}
		});
		return response.handleSuccessResponse("Product removed from listing");
	}
	async addCategory(productId, categoryId) {
		if(!await ProductCategoriesModel.count({
			where: {
				product_id: productId,
				category_id: categoryId,
				is_deleted: false
			}
		})) {
			await ProductCategoriesModel.create({
				product_id: productId,
				category_id: categoryId
			});
		}
		return response.handleSuccessResponse("Category tagged");
	}
	async removeCategory(productId, categoryId) {
		await ProductCategoriesModel.update({
			is_deleted: true
		},{
			where: {
				product_id: productId,
				category_id: categoryId,
				is_deleted: false
			}
		});
		return response.handleSuccessResponse("Category removed");
	}
	async updateQuantity(productObj) {
		if(await ProductDetailsModel.count({
			where: {
				quantity: productObj['quantity'],
				product_id: productObj['product_id'],
				is_deleted: false
			}
		})) {
			await ProductDetailsModel.update({
				measuring_units: productObj['measuring_units'],
				listing_price: productObj['listing_price'],
				sale_price: productObj['sale_price'] ,
				discount: productObj['discount']
			},{
				where: {
					quantity: productObj['quantity'],
					product_id: productObj['product_id'],
					is_deleted: false
				}
			});
			return response.handleSuccessResponse("Quantity updated");
		} else {
			await ProductDetailsModel.create({
				product_id: productObj['product_id'],
				quantity: productObj['quantity'],
				measuring_units: productObj['measuring_units'],
				listing_price: productObj['listing_price'],
				sale_price: productObj['sale_price'] ,
				discount: productObj['discount']
			});
			return response.handleSuccessResponse("Quantity added");
		}
	}
	async removeQuantity(productObj) {
		await ProductDetailsModel.update({
			is_deleted: true
		},{
			where: {
				quantity: productObj['quantity'],
				product_id: productObj['product_id'],
				is_deleted: false
			}
		});
		return response.handleSuccessResponse("Quantity removed");
	}

}
module.exports = new ProductsService();