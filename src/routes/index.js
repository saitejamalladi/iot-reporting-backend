const express = require("express");
const router = express.Router();
let authRouter = require("./auth");
let userRouter = require("./user");
let categoriesRouter = require("./categories");
let productsRouter = require("./products");

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/categories", categoriesRouter);
router.use("/products", productsRouter);

module.exports = router;
