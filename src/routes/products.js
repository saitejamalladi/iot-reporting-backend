const express = require('express');
const router = express.Router();
const authMiddleware = require('./middlewares/auth');
const productsMiddleware = require('./middlewares/products');
const productsController = require('../controllers/products');
const constants = require('../constants');

router.post(
	'/create',
	(req, res, next) => authMiddleware.verifyToken([constants.ROLES.STAFF, constants.ROLES.ADMIN], req, res, next),
	productsMiddleware.validate(constants.VALIDATIONS.CREATE),
	productsController.createProduct
);
router.get(
	'/list',
	productsController.listProduct
);
router.get(
	'/:product_id',
	productsMiddleware.validate(constants.VALIDATIONS.FETCH),
	productsController.getProduct
);
router.post(
	'/update',
	(req, res, next) => authMiddleware.verifyToken([constants.ROLES.STAFF, constants.ROLES.ADMIN], req, res, next),
	productsMiddleware.validate(constants.VALIDATIONS.UPDATE),
	productsController.updateProduct
);
router.delete(
	'/:product_id',
	(req, res, next) => authMiddleware.verifyToken([constants.ROLES.STAFF, constants.ROLES.ADMIN], req, res, next),
	productsMiddleware.validate(constants.VALIDATIONS.REMOVE),
	productsController.removeProduct
);
router.post(
	'/category/add',
	(req, res, next) => authMiddleware.verifyToken([constants.ROLES.STAFF, constants.ROLES.ADMIN], req, res, next),
	productsMiddleware.validate(constants.VALIDATIONS.ADD_CATEGORY),
	productsController.addCategory
);
router.delete(
	'/category/remove',
	(req, res, next) => authMiddleware.verifyToken([constants.ROLES.STAFF, constants.ROLES.ADMIN], req, res, next),
	productsMiddleware.validate(constants.VALIDATIONS.REMOVE_CATEGORY),
	productsController.removeCategory
);
router.post(
	'/quantity/add',
	(req, res, next) => authMiddleware.verifyToken([constants.ROLES.STAFF, constants.ROLES.ADMIN], req, res, next),
	productsMiddleware.validate(constants.VALIDATIONS.ADD_QUANTITY),
	productsController.updateQuantity
);
router.post(
	'/quantity/update',
	(req, res, next) => authMiddleware.verifyToken([constants.ROLES.STAFF, constants.ROLES.ADMIN], req, res, next),
	productsMiddleware.validate(constants.VALIDATIONS.UPDATE_QUANTITY),
	productsController.updateQuantity
);
router.delete(
	'/quantity/remove',
	(req, res, next) => authMiddleware.verifyToken([constants.ROLES.STAFF, constants.ROLES.ADMIN], req, res, next),
	productsMiddleware.validate(constants.VALIDATIONS.REMOVE_QUANTITY),
	productsController.removeQuantity
);

module.exports = router;
