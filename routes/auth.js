var express = require('express');
var auth = require('../controller/auth.controller');
var router = express.Router();

/**
 * Name: Login
 * Created At : 16/07/2021
 */
router.post('/', auth.login);


module.exports = router;
