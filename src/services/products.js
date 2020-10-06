const ProductsModel = require('../models/products').Products;
const ProductCategoriesModel = require('../models/products').ProductCategories;
const ProductDetailsModel = require('../models/products').ProductDetails;
const RandomKeyService = require('./randomKey');
const elasticsearchService = require('./elasticsearch');
const response = require("../utils/response");
const constants = require('../constants');
const moment = require('moment');
class ProductsService {
	async create(productObj) {
		let productId = "product_" + await RandomKeyService.generate(10);
		let productModel = {
			product_id: productId,
			name: productObj['name'],
			description: productObj['description'],
			thumbnail_url: productObj['thumbnail_url'],
			display_priority: productObj['display_priority']
		};
		let productCategories = productObj['category_ids'].map(categoryId => {
			return {
				category_id: categoryId,
				product_id: productId
			}
		});
		let productDetails = productObj['product_details'].map(detail => {
			return {
				product_id: productId,
				quantity: detail['quantity'],
				available_units: detail['available_units'],
				measuring_units: detail['measuring_units'],
				listing_price: detail['listing_price'],
				sale_price: detail['sale_price'],
				discount: detail['discount']
			}
		});
		await ProductsModel.create(productModel);
		await ProductCategoriesModel.bulkCreate(productCategories);
		await ProductDetailsModel.bulkCreate(productDetails);

		let productInfo = await this.getProductInfo(productId);
		await elasticsearchService.save(constants.PRODUCT_INDEX, productId, productInfo);
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
				attributes: ['quantity', 'available_units', 'measuring_units', 'listing_price', 'sale_price', 'discount'],
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
	async search(searchText) {
		try  {
			let productResults = await elasticsearchService.searchProducts(constants.PRODUCT_INDEX, searchText);
			return response.handleSuccessResponseWithData("Available products", productResults);
		} catch (error) {
			return response.handleBadRequest("Unable to search currently.\n Error : " + error);
		}
	}
	async getProductInfo(productId) {
		let productInfo = await ProductsModel.findOne({
			where: {
				product_id: productId,
				is_deleted: false
			},
			include: [{
				model: ProductDetailsModel,
				as: "product_details",
				where: {
					is_deleted: false
				},
				attributes: ['quantity', 'available_units', 'measuring_units', 'listing_price', 'sale_price', 'discount'],
				required: false,
				raw: true
			}, {
				model: ProductCategoriesModel,
				as: 'categories',
				where: {
					is_deleted: false
				},
				attributes: ['category_id'],
				required: false,
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
		return productInfo;
	}
	async get(productId) {
		let productInfo = await this.getProductInfo(productId);
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
		let productInfo = await this.getProductInfo(productObj['product_id']);
		await elasticsearchService.save(constants.PRODUCT_INDEX, productObj['product_id'], productInfo);
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
		await elasticsearchService.remove(constants.PRODUCT_INDEX, productId);
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
		let productInfo = await this.getProductInfo(productId);
		await elasticsearchService.save(constants.PRODUCT_INDEX, productId, productInfo);
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
		let productInfo = await this.getProductInfo(productId);
		await elasticsearchService.save(constants.PRODUCT_INDEX, productId, productInfo);
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
				available_units: productObj['available_units'],
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
		} else {
			await ProductDetailsModel.create({
				product_id: productObj['product_id'],
				quantity: productObj['quantity'],
				available_units: productObj['available_units'],
				measuring_units: productObj['measuring_units'],
				listing_price: productObj['listing_price'],
				sale_price: productObj['sale_price'] ,
				discount: productObj['discount']
			});
		}
		let productInfo = await this.getProductInfo(productObj['product_id']);
		await elasticsearchService.save(constants.PRODUCT_INDEX, productObj['product_id'], productInfo);
		return response.handleSuccessResponse("Quantity added/updated");
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
		let productInfo = await this.getProductInfo(productObj['product_id']);
		await elasticsearchService.save(constants.PRODUCT_INDEX, productObj['product_id'], productInfo);
		return response.handleSuccessResponse("Quantity removed");
	}
}
module.exports = new ProductsService();