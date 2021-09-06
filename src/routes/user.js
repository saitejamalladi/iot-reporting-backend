const express = require("express");
const router = express.Router();
const constants = require("../constants");
const authMiddleware = require("./middlewares/auth");
const userMiddleware = require("./middlewares/user");
const userController = require("../controllers/user");

router.post(
  "/",
  (req, res, next) => authMiddleware.verifyToken(req, res, next),
  userMiddleware.validate(constants.VALIDATIONS.REGISTER),
  userController.register
);
router.put(
  "/",
  (req, res, next) => authMiddleware.verifyToken(req, res, next),
  userMiddleware.validate(constants.VALIDATIONS.UPDATE),
  userController.update
);
router.put(
  "/reset-password",
  userMiddleware.validate(constants.VALIDATIONS.RESET_PASSWORD),
  userController.resetPassword
);
router.get(
  "/",
  (req, res, next) => authMiddleware.verifyToken(req, res, next),
  userController.getInfo
);
router.get(
  "/list",
  (req, res, next) => authMiddleware.verifyToken(req, res, next),
  userController.listUsers
);
router.get("/company", userController.listCompanies);

router.get(
  "/permissions",
  (req, res, next) => authMiddleware.verifyToken(req, res, next),
  userController.listPermissions
);

module.exports = router;
