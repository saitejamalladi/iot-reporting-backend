const express = require('express');
const router = express.Router();
const authMiddleware = require('./middlewares/auth');
const categoriesMiddleware = require('./middlewares/categories');
const categoriesController = require('../controllers/categories');
const constants = require('../constants');

router.post(
	'/create',
	(req, res, next) => authMiddleware.verifyToken([constants.ROLES.STAFF, constants.ROLES.ADMIN], req, res, next),
	categoriesMiddleware.validate(constants.VALIDATIONS.CREATE),
	categoriesController.createCategory
);
router.get(
	'/list',
	categoriesController.listCategory
);
router.get(
	'/:id',
	categoriesMiddleware.validate(constants.VALIDATIONS.FETCH),
	categoriesController.getCategory
);
router.post(
	'/update',
	(req, res, next) => authMiddleware.verifyToken([constants.ROLES.STAFF, constants.ROLES.ADMIN], req, res, next),
	categoriesMiddleware.validate(constants.VALIDATIONS.UPDATE),
	categoriesController.updateCategory
);
router.delete(
	'/:id',
	(req, res, next) => authMiddleware.verifyToken([constants.ROLES.STAFF, constants.ROLES.ADMIN], req, res, next),
	categoriesMiddleware.validate(constants.VALIDATIONS.REMOVE),
	categoriesController.removeCategory
);

module.exports = router;
