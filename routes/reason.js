var express = require('express');
var reason = require('../controller/reasoncode.controller');
const multer = require('multer');
var router = express.Router();


// router.post('/', issue.create);
router.get('/', reason.getAll);
router.get('/count', reason.getCount);



module.exports = router;
