var express = require('express');
var issue = require('../controller/issue.controller');
const multer = require('multer');
var router = express.Router();


router.post('/', issue.create);
router.get('/', issue.getAll);



module.exports = router;
