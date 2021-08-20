const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");

router.get("/", userController.listUsers);
router.get("/roles", userController.listUserRoles);
router.get("/account/", userController.listAccounts);
router.get("/account/roles", userController.listAccountRoles);

router.get("/bins", userController.listBins);
router.get("/categories", userController.listCategories);

module.exports = router;
