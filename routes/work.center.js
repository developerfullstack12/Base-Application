var express = require('express');
var workcenter = require('../controller/workcenter.controller');
const multer = require('multer');
var router = express.Router();


// router.post('/', issue.create);
router.get('/', workcenter.getAll);
router.get('/sub', workcenter.getAllSubCenter);



module.exports = router;
