const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const userMiddleware = require('../middlewares/users');
const userController = require('../controllers/users');
const constants = require('../constants');

router.post(
  '/',
  authMiddleware.verifyBearerToken,
  userMiddleware.validate(constants.USER.CREATE),
  userController.create
);
module.exports = router;
