var express = require('express');
var doc = require('./document');
var auth = require('./auth');
var common = require('./common');
var issue = require('./issue');
var reason = require('./reason');
var workcenter = require('./work.center');
var {authUser, commonHeader} = require('./middleware');
var router = express.Router();

router.use('/',commonHeader, common);
router.use('/login',commonHeader, auth);
router.use('/doc', doc);
router.use('/issue', issue);
router.use('/reason', reason);
router.use('/center', workcenter);

module.exports = router;
