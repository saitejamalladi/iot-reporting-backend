const express = require("express");
const router = express.Router();
const constants = require("../constants");
const authMiddleware = require("./middlewares/auth");
const scaleMiddleware = require("./middlewares/scale");
const scaleController = require("../controllers/scale");

router.post(
  "",
  (req, res, next) => authMiddleware.verifyToken(req, res, next),
  scaleMiddleware.validate(constants.VALIDATIONS.REGISTER),
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

router.post(
  "/data",
  (req, res, next) => authMiddleware.verifyToken(req, res, next),
  scaleMiddleware.validate(constants.VALIDATIONS.ADD_DATA),
  scaleController.create
);
router.get(
  "/data/:scale_id",
  (req, res, next) => authMiddleware.verifyToken(req, res, next),
  scaleController.list
);
router.delete("/data/:id_scale_data", scaleController.deleteData);

module.exports = router;
