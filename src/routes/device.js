const express = require("express");
const router = express.Router();
const authMiddleware = require("./middlewares/auth");
const deviceController = require("../controllers/device");

router.post(
  "/register",
  (req, res, next) => authMiddleware.verifyToken(req, res, next),
  deviceController.register
);
router.get(
  "/list",
  (req, res, next) => authMiddleware.verifyToken(req, res, next),
  deviceController.list
);

module.exports = router;
