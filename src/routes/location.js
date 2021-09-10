const express = require("express");
const router = express.Router();
const constants = require("../constants");
const authMiddleware = require("./middlewares/auth");
const LocationMiddleware = require("./middlewares/Location");
const locationController = require("../controllers/locations");

router.post(
  "",
  (req, res, next) => authMiddleware.verifyToken(req, res, next),
  LocationMiddleware.validate(constants.VALIDATIONS.CREATE),
  locationController.create
);

router.get(
  "",
  (req, res, next) => authMiddleware.verifyToken(req, res, next),
  locationController.list
);
router.delete(
  "/:location",
  (req, res, next) => authMiddleware.verifyToken(req, res, next),
  locationController.delete
);

module.exports = router;
