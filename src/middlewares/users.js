const { check } = require('express-validator');
const constants = require('../constants');
exports.validate = (method) => {
	switch (method) {
		case constants.USER.CREATE: {
			return [
				check('userName', 'userName doesn`t exists').exists(),
				check('email', 'Invalid email').exists().isEmail(),
				check('phone').optional().isInt(),
				check('status').optional().isIn(['enabled', 'disabled'])
			]
		}
	}
};