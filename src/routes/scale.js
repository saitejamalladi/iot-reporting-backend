const express = require("express");
const router = express.Router();
const constants = require("../constants");
const authMiddleware = require("./middlewares/auth");
const scaleMiddleware = require("./middlewares/scale");
const scaleController = require("../controllers/scale");

router.post(
  "",
  (req, res, next) => authMiddleware.verifyToken(req, res, next),
  scaleMiddleware.validate(constants.VALIDATIONS.CREATE),
  scaleController.create
);
router.put(
  "",
  (req, res, next) => authMiddleware.verifyToken(req, res, next),
  scaleMiddleware.validate(constants.VALIDATIONS.UPDATE),
  scaleController.update
);
router.get(
  "/:device_id",
  (req, res, next) => authMiddleware.verifyToken(req, res, next),
  scaleController.list
);
router.delete("/:scale_id", scaleController.delete);

module.exports = router;
