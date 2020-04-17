var express = require('express');
var router = express.Router();
var sessionRouter = require('./session')
var userRouter = require('./user')

router.use(sessionRouter);
router.use(userRouter);

module.exports = router;
