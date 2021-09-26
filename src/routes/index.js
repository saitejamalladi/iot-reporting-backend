const express = require("express");
const router = express.Router();
let authRouter = require("./auth");
let accountRouter = require("./account");
let userRouter = require("./user");
let deviceRouter = require("./device");
let scaleRouter = require("./scale");
let mealCountRouter = require("./mealcount");
let binRouter = require("./bin");

router.use("/auth", authRouter);
router.use("/account", accountRouter);
router.use("/user", userRouter);
router.use("/device", deviceRouter);
router.use("/scale", scaleRouter);
router.use("/meal-count", mealCountRouter);
router.use("/bin", binRouter);

module.exports = router;
