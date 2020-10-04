const { check, param } = require('express-validator');
const constants = require('../../constants');

class CategoriesMiddleware {
	validate(method) {
		switch (method) {
			case constants.VALIDATIONS.CREATE: {
				return [
					check('name', 'Missing name').exists()
				]
			}
			case constants.VALIDATIONS.FETCH: {
				return [
					param('id', 'Missing id').exists(),
					param('id', 'id must be integer').toInt()
				]
			}
			case constants.VALIDATIONS.UPDATE: {
				return [
					check('id', 'Missing id').exists(),
					check('id', 'id must be integer').toInt(),
					check('name', 'Missing name').exists()
				]
			}
			case constants.VALIDATIONS.REMOVE: {
				return [
					param('id', 'Missing id').exists(),
					param('id', 'id must be integer').toInt()
				]
			}
		}
	}
}

module.exports = new CategoriesMiddleware();