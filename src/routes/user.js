const express = require("express");
const router = express.Router();
const authMiddleware = require("./middlewares/auth");
const userController = require("../controllers/user");

router.get("/info", authMiddleware.verifyToken, userController.getInfo);
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
