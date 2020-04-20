var express = require('express');
var router = express.Router();
var sessionRouter = require('./session')
var userRouter = require('./user')
var chatRouter = require('./chat')
var contactRouter = require('./contact')

router.use(sessionRouter);
router.use(userRouter);
router.use(chatRouter);
router.use(contactRouter);

module.exports = router;
