const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");

router.get("/", userController.listUsers);
router.get("/roles", userController.listUserRoles);
module.exports = router;
