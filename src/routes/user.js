const express = require("express");
const router = express.Router();
const constants = require("../constants");
const authMiddleware = require("./middlewares/auth");
const userMiddleware = require("./middlewares/user");
const userController = require("../controllers/user");

router.post(
  "/",
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
router.get("/list", userController.listUsers);
router.get("/roles", userController.listUserRoles);
router.get("/account/", userController.listAccounts);
router.get("/account/roles", userController.listAccountRoles);

router.get("/bins", userController.listBins);
router.get("/categories", userController.listCategories);

router.get("/companies", userController.listCompanies);
router.get("/devices", userController.listDevices);

router.get("/locations", userController.listLocations);
router.get("/mealcount", userController.listMealCount);

module.exports = router;
