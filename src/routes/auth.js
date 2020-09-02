const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const userMiddleware = require('../middlewares/users');
const authController = require('../controllers/auth');
const constants = require('../constants');

router.post(
  '/token',
  authMiddleware.verifyBasicAuthentication,
  authMiddleware.validate(constants.AUTH.TOKEN),
  authController.generateToken
);
module.exports = router;
