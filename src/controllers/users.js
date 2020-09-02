const { check, oneOf, validationResult } = require('express-validator');

const create = async (req, res) => {
	try {
		const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions
		if (!errors.isEmpty()) {
			res.status(400).json({ errors: errors.array() });
			return;
		}
		const { userName, email, phone, status } = req.body;
		console.log(userName, email, phone, status);
		res.status(200).json(req.body);
	} catch(err) {
		return next(err)
	}
};

module.exports = {
	create: create
};