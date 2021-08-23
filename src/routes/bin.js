const express = require("express");
const router = express.Router();
const constants = require("../constants");
const authMiddleware = require("./middlewares/auth");
const binMiddleware = require("./middlewares/bin");
const binController = require("../controllers/bin");

router.post(
  "",
  (req, res, next) => authMiddleware.verifyToken(req, res, next),
  binMiddleware.validate(constants.VALIDATIONS.CREATE),
  binController.create
);
router.put(
  "",
  (req, res, next) => authMiddleware.verifyToken(req, res, next),
  binMiddleware.validate(constants.VALIDATIONS.UPDATE),
  binController.update
);
router.get(
  "/:device_id",
  (req, res, next) => authMiddleware.verifyToken(req, res, next),
  binController.list
);
router.delete("/:scale_id", binController.delete);

module.exports = router;
