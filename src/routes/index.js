const express = require('express');
const router = express.Router();
let authRouter = require('./auth');
let userRouter = require('./user');
let categoriesRouter = require('./categories');

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/categories', categoriesRouter);

module.exports = router;
