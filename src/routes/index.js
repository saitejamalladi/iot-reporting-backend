const express = require("express");
const router = express.Router();
let authRouter = require("./auth");
let userRouter = require("./user");
let deviceRouter = require("./device");

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/device", deviceRouter);

module.exports = router;
