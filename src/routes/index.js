const express = require('express');
const router = express.Router();
let authRouter = require('./auth');
let userRouter = require('./users');

router.use('/auth', authRouter);
router.use('/users', userRouter);

module.exports = router;
