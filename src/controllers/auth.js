const { check, validationResult } = require('express-validator');
const authService = require('../services/auth');

const generateToken = async (req, res) => {
	try {
		const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions
		if (!errors.isEmpty()) {
			res.status(400).json({ errors: errors.array() });
			return;
		}
		let response = await authService.generateToken(req.body);
		res.status(200).json(response);
	} catch(err) {
		res.status(500).send(err);
	}
};

module.exports = {
	generateToken: generateToken
};