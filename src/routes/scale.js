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
  "/all",
  (req, res, next) => authMiddleware.verifyToken(req, res, next),
  scaleController.listAll
);
router.get(
  "/report",
  (req, res, next) => authMiddleware.verifyToken(req, res, next),
  scaleController.report
);
router.get(
  "/list/:device_id",
  (req, res, next) => authMiddleware.verifyToken(req, res, next),
  scaleController.list
);

router.delete(
  "/:scale_id",
  (req, res, next) => authMiddleware.verifyToken(req, res, next),
  scaleController.delete
);
router.get(
  "/config",
  (req, res, next) => authMiddleware.verifyToken(req, res, next),
  scaleController.getConfig
);
router.post(
  "/data",
  (req, res, next) => authMiddleware.verifyToken(req, res, next),
  scaleMiddleware.validate(constants.VALIDATIONS.ADD_DATA),
  scaleController.addData
);
router.get(
  "/data/:scale_id",
  (req, res, next) => authMiddleware.verifyToken(req, res, next),
  scaleController.listData
);
router.delete(
  "/data/:id_scale_data",
  (req, res, next) => authMiddleware.verifyToken(req, res, next),
  scaleController.deleteData
);

module.exports = router;
