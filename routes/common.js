var express = require('express');
var common = require('../controller/common.controller');
var router = express.Router();


/**
 * Name: Register User
 * Created At : 16/07/2021
 * 
 */
router.post('/register', common.register);


module.exports = router;
