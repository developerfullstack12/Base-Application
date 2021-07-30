const db = require("../Modal");
const User = db.User;
const Op = db.Sequelize.Op;
var bcrypt = require('bcrypt');

/**
 * Name: Register User
 * Created At : 16/07/2021
 * 
 */
exports.register = async (req, res) => {
    if (!req.body.email || !req.body.password) {
      return res.status(res.__("STATUS_BAD_REQUEST")).json(res.__("REQUIRED"));
    }
  
    if (req.body.password != req.body.cpassword) {
      return res.status(res.__("STATUS_BAD_REQUEST")).json(res.__("PASSWORD_MISMATCH"));
    }
  
    try {
      let isEmail = await User.findOne({ where: {email: req.body.email} });
      if (isEmail) {
        return res.status(res.__("STATUS_BAD_REQUEST")).json(res.__("ALREADEY_REGISTERED"));
      }
      req.body.password = bcrypt.hashSync(req.body.password, 10);
      req.body.role = 2;
      let data = await User.create(req.body);
      if (data) {
        return res.status(res.__("STATUS_CREATED")).json(res.__("USER_CREATED"));
      } else {
        return res.status(res.__("STATUS_INTERNAL_SERVER_ERROR")).json(res.__('WRONG'));
      }
  
    } catch (error) {
      return res.status(res.__("STATUS_INTERNAL_SERVER_ERROR")).json(res.__('WRONG'));
    }
  }