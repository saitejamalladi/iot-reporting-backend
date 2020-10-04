const CategoriesModel = require('../models/products').Categories;
const response = require("../utils/response");

class CategoriesService {
	async create(name) {
		let category = await CategoriesModel.findOne({
			where: {
				name: name,
				is_deleted: false
			},
			attributes: ['id', 'name'],
			raw: true
		});
		if(!category) {
			let category = await CategoriesModel.create({
				name: name
			});
			let categoryObj = {
				id: category.id,
				name: category.name,
			};
			return response.handleSuccessResponseWithData("Category created", categoryObj);
		}
		return response.handleBadRequestWithData('Category already exist', category);
	}
	async list() {
		let categories = await CategoriesModel.findAll({
			where: {
				is_deleted: false
			},
			attributes: ['id', 'name'],
			raw: true
		});
		return response.handleSuccessResponseWithData("Category list", categories);
	}
	async get(categoryId) {
		let category = await CategoriesModel.findOne({
			where: {
				id: categoryId,
				is_deleted: false
			},
			attributes: ['id', 'name'],
			order: ['id'],
			raw: true
		});
		return response.handleSuccessResponseWithData("Category info", category);
	}
	async update(category) {
		await CategoriesModel.update({
			name: category['name']
		},{
			where: {
				id: category['id'],
				is_deleted: false
			},
		});
		return response.handleSuccessResponse("Category updated");
	}
	async remove(categoryId) {
		await CategoriesModel.update({
			is_deleted: true
		}, {
			where: {
				id: categoryId,
				is_deleted: false
			},
		});
		return response.handleSuccessResponse("Category removed");
	}
}
module.exports = new CategoriesService();