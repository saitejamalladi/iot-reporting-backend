const express = require("express");
const router = express.Router();
const authMiddleware = require("./middlewares/auth");
const authController = require("../controllers/auth");
const constants = require("../constants");

router.post(
  "/token",
  authMiddleware.verifyBasicAuthentication,
  authMiddleware.validate(constants.VALIDATIONS.GENERATE_TOKEN),
  authController.generateToken
);
module.exports = router;
