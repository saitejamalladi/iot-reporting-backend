const express = require("express");
const router = express.Router();
const constants = require("../constants");
const authMiddleware = require("./middlewares/auth");
const accountMiddleware = require("./middlewares/account");
const accountController = require("../controllers/account");

router.post(
  "",
  (req, res, next) => authMiddleware.verifyToken(req, res, next),
  accountMiddleware.validate(constants.VALIDATIONS.CREATE),
  accountController.create
);
router.get("", accountController.list);
router.get(
  "/child/:account_id",
  (req, res, next) => authMiddleware.verifyToken(req, res, next),
  accountController.listChildAccounts
);

module.exports = router;
