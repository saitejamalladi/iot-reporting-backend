const express = require("express");
const router = express.Router();
let authRouter = require("./auth");
let userRouter = require("./user");

router.use("/auth", authRouter);
router.use("/user", userRouter);

module.exports = router;
