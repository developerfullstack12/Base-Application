var express = require('express');
var document = require('../controller/document.controller');
const multer = require('multer');
var router = express.Router();

const storage = multer.diskStorage({

  destination: (req, file, cb) => {
    if (file.fieldname == 'document') {
      cb(null, 'public/uploads/document')
    }
  },
  filename: (req, file, cb) => {
    // cb(null, Date.now() + '-' + file.originalname)//Manage unique file
    cb(null, file.originalname)
  }
});
var profilePic = multer({ storage: storage }).any();

router.post('/', profilePic, document.create);
router.get('/', document.getAll);



module.exports = router;
