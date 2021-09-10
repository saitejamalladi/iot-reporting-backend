const express = require("express");
const router = express.Router();
let authRouter = require("./auth");
let accountRouter = require("./account");
let userRouter = require("./user");
let deviceRouter = require("./device");
let scaleRouter = require("./scale");
let binRouter = require("./bin");
const locationRouter = require("./location");

router.use("/auth", authRouter);
router.use("/account", accountRouter);
router.use("/user", userRouter);
router.use("/device", deviceRouter);
router.use("/scale", scaleRouter);
router.use("/bin", binRouter);
router.use("/location",locationRouter);

module.exports = router;
