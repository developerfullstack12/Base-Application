var express = require('express');
var user = require('./users');
var auth = require('./auth');
var common = require('./common');
var {authUser, commonHeader} = require('./middleware');
var router = express.Router();
router.use('/',commonHeader, common);
router.use('/login',commonHeader, auth);
router.use('/user',authUser, user);

module.exports = router;
