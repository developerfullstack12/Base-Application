var express = require('express');
var bcrypt = require('bcrypt');
// var { USER_MSG, found, err,status, COMMON, AUTH } = require('../shared/messages');
var { commonMail } = require('../shared/email.content');
var { sendEMail } = require('../shared/mail');
var { getRandomInt } = require('../shared/functions');
var { User } = require('../Modal/Users');
var localStorage = require('localStorage');
var router = express.Router();
const jwt = require('jsonwebtoken');
var {authAdmin} = require('./middleware');


/**
 * Name: Register User
 * Created At : 15/07/2021
 * 
 */
router.post('/register', async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(res.__("STATUS_BAD_REQUEST")).json(res.__("REQUIRED"));
  }

  if (req.body.password != req.body.cpassword) {
    return res.status(res.__("STATUS_BAD_REQUEST")).json(res.__("PASSWORD_MISMATCH"));
  }

  try {
    let isEmail = await User.findOne({ email: req.body.email });
    if (isEmail) {
      return res.status(res.__("STATUS_BAD_REQUEST")).json(res.__("ALREADEY_REGISTERED"));

    }
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    req.body.role = 2;
    let data = await new User(req.body).save();
    if (data) {
      return res.status(res.__("STATUS_CREATED")).json(res.__("USER_CREATED"));
    } else {
      return res.status(res.__("STATUS_INTERNAL_SERVER_ERROR")).json(res.__('WRONG'));
    }

  } catch (error) {
    return res.status(res.__("STATUS_INTERNAL_SERVER_ERROR")).json(res.__('WRONG'));
  }
});

/**
 * Name: Register Admin
 * Created At : 15/07/2021
 * 
 */
 router.post('/register-admin',authAdmin, async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(res.__("STATUS_BAD_REQUEST")).json(res.__("REQUIRED"));
  }

  if (req.body.password != req.body.cpassword) {
    return res.status(res.__("STATUS_BAD_REQUEST")).json(res.__("PASSWORD_MISMATCH"));
  }

  try {
    let isEmail = await User.findOne({ email: req.body.email });
    if (isEmail) {
      return res.status(res.__("STATUS_BAD_REQUEST")).json(res.__("ALREADEY_REGISTERED"));

    }
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    req.body.role = 1;
    let data = await new User(req.body).save();
    if (data) {
      return res.status(res.__("STATUS_CREATED")).json(res.__("USER_CREATED"));
    } else {
      return res.status(res.__("STATUS_INTERNAL_SERVER_ERROR")).json(res.__('WRONG'));
    }

  } catch (error) {
    return res.status(res.__("STATUS_INTERNAL_SERVER_ERROR")).json(res.__('WRONG'));
  }
});



/**
 * 
 * Created At : 21/12/2020
 */
router.post('/forgot', async (req, res) => {
  if (!req.body.email) {
    return res.json(COMMON.REQUIRED);
  }

  try {
    let data = await User.findOne({ email: req.body.email, status: 1 }).select('email');
    let random = getRandomInt();
    localStorage.setItem(`${random}`, req.body.email);
    setTimeout(() => {
      localStorage.removeItem(`${random}`);
    }, 30 * 60 * 1000)
    if (!data) {
      return res.json(AUTH.INCORRECT_EMAIL);
    }
    let msgbod = `
      We send this email because you are requested to forgot password. Please confirm the token to reset your password. Your token is : ${random}.
    `;
    sendEMail((req.body.email).trim(), process.env.APP_NAME, commonMail("Forgot Password", data.name, msgbod))
    return res.json(COMMON.EMAIL_SEND);
  } catch (error) {
    return res.json(err(error));
  }
});


/**
 * 
 * Created At : 21/12/2020
 */
router.post('/confirm', async (req, res) => {
  if (!req.body.token || !req.body.password || !req.body.cpassword) {
    return res.json(COMMON.REQUIRED);
  }
  if (req.body.password != req.body.cpassword) {
    return res.json(AUTH.MISS_PASSWORD);
  }
  let reqEmail = localStorage.getItem(req.body.token);
  if (!reqEmail) {
    return res.json(AUTH.INVALID_TOKEN);
  }
  try {
    let data = await User.findOneAndUpdate({
      email: reqEmail.trim(),
      status: 1
    }, {
      password: bcrypt.hashSync(req.body.password, 10)
    });

    if (!data) {
      return res.json(AUTH.UNABLE_UPDATE);
    } else {
      localStorage.removeItem(`${req.body.token}`);
      return res.json(AUTH.RESET_SUCCESS);
    }
  } catch (error) {
    return res.json(err(error));
  }
});


module.exports = router;
