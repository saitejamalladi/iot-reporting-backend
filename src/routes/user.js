const express = require("express");
const router = express.Router();
const authMiddleware = require("./middlewares/auth");
const userMiddleware = require("./middlewares/user");
const userController = require("../controllers/user");
const constants = require("../constants");

router.post(
  "/create",
  authMiddleware.verifyBasicAuthentication,
  userMiddleware.validate(constants.VALIDATIONS.CREATE),
  userController.createCustomer
);
router.post(
  "/create/staff",
  (req, res, next) =>
    authMiddleware.verifyToken([constants.ROLES.ADMIN], req, res, next),
  userMiddleware.validate(constants.VALIDATIONS.CREATE),
  userController.createSalesStaff
);
module.exports = router;
