const express = require("express");
const router = express.Router();
const authMiddleware = require("./middlewares/auth");
const deviceController = require("../controllers/device");

router.get(
  "/list/:accountId",
  (req, res, next) => authMiddleware.verifyToken(req, res, next),
  deviceController.list
);

module.exports = router;
