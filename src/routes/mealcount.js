const express = require("express");
const router = express.Router();
const authMiddleware = require("./middlewares/auth");
const mealCountController = require("../controllers/mealcount");
const mealCountMiddleware = require("./middlewares/mealCount");
const constants = require("../constants");
const accountMiddleware = require("./middlewares/account");
const accountController = require("../controllers/account");

router.post(
  "",
  (req, res, next) => authMiddleware.verifyToken(req, res, next),
  mealCountController.create
);
router.get(
  "/",
  (req, res, next) => authMiddleware.verifyToken(req, res, next),
  mealCountController.list
);
router.delete(
  "/:meal_count_id",
  (req, res, next) => authMiddleware.verifyToken(req, res, next),
  mealCountController.delete
);

router.put(
  "/benchmark",
  (req, res, next) => authMiddleware.verifyToken(req, res, next),
  mealCountMiddleware.validate(constants.VALIDATIONS.UPDATE),
  mealCountController.updateBenchmark
);
router.get(
  "/benchmark",
  (req, res, next) => authMiddleware.verifyToken(req, res, next),
  mealCountController.listBenchmark
);


module.exports = router;
