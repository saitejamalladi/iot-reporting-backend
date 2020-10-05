const { check, param } = require('express-validator');
const constants = require('../../constants');

class ProductsMiddleware {
	validate(method) {
		switch (method) {
			case constants.VALIDATIONS.CREATE: {
				return [
					check('name', 'Missing name').exists(),
					check('description', 'invalid description').optional(),
					check('thumbnail_url', 'invalid thumbnail_url').optional().contains('http'),
					check('display_priority', 'invalid display_priority').exists().isInt({min: 1, max: 4}),
					check('product_details.*.quantity', 'invalid quantity in product_details').isInt(),
					check('product_details.*.available_units', 'invalid available_units in product_details').isInt({min: 1}),
					check('product_details.*.measuring_units', 'invalid measuring_units in product_details').optional(),
					check('product_details.*.listing_price', 'invalid listing_price in product_details').isFloat({min: 0.00}),
					check('product_details.*.sale_price', 'invalid sale_price in product_details').isFloat({min: 0.00}),
					check('product_details.*.discount', 'invalid discount in product_details').isFloat({min: 0.00, max: 100.00}),
					check('category_ids', 'missing category_ids').exists(),
					check('category_ids', 'invalid category_ids').isArray({min: 1}),
					check('category_ids.*', 'invalid category_ids').isInt()
				]
			}
			case constants.VALIDATIONS.FETCH: {
				return [
					param('product_id', 'Missing product id').exists(),
				]
			}
			case constants.VALIDATIONS.UPDATE: {
				return [
					check('product_id', 'Missing product_id').exists(),
					check('name', 'Missing name').exists(),
					check('description', 'Missing thumbnail_url').optional(),
					check('thumbnail_url', 'invalid thumbnail_url').optional().contains('http'),
					check('display_priority', 'invalid display_priority').exists().isInt({min: 1, max: 4}),
				]
			}
			case constants.VALIDATIONS.REMOVE: {
				return [
					param('product_id', 'Missing product_id').exists(),
				]
			}
			case constants.VALIDATIONS.ADD_CATEGORY: {
				return [
					check('product_id', 'Missing product_id').exists(),
					check('category_id', 'Missing category_id').exists(),
				]
			}
			case constants.VALIDATIONS.REMOVE_CATEGORY: {
				return [
					check('product_id', 'Missing product_id').exists(),
					check('category_id', 'Missing category_id').exists(),
				]
			}
			case constants.VALIDATIONS.ADD_QUANTITY: {
				return [
					check('product_id', 'Missing product_id').exists(),
					check('quantity', 'Missing quantity').exists(),
					check('available_units', 'Missing available_units').exists(),
					check('measuring_units', 'Missing measuring_units').exists(),
					check('listing_price', 'invalid listing_price').exists().isFloat({min: 0.01}),
					check('sale_price', 'invalid sale_price').exists().isFloat(),
					check('discount', 'invalid discount').exists().isFloat({min: 0.00, max: 100})
				]
			}
			case constants.VALIDATIONS.UPDATE_QUANTITY: {
				return [
					check('product_id', 'Missing product_id').exists(),
					check('quantity', 'Missing quantity').exists(),
					check('available_units', 'Missing available_units').exists(),
					check('measuring_units', 'Missing measuring_units').exists(),
					check('listing_price', 'invalid listing_price').exists().isFloat({min: 0.01}),
					check('sale_price', 'invalid sale_price').exists().isFloat(),
					check('discount', 'invalid discount').exists().isFloat({min: 0.00, max: 100})
				]
			}
			case constants.VALIDATIONS.REMOVE_QUANTITY: {
				return [
					check('product_id', 'Missing product_id').exists(),
					check('quantity', 'Missing quantity').exists()
				]
			}
		}
	}
}

module.exports = new ProductsMiddleware();