const db = require("../Modal");
const User = db.User;
const Op = db.Sequelize.Op;
var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/**
 * Name: Login User
 * Created At : 16/07/2021
 * 
 */
exports.login = async (req, res) => {
  try {
    let data = await User.findOne({ where:{ email: req.body.email},attributes: ['email', 'password', 'role', 'profile']
      });
    if (!data) {
        return res.json({success: false, message: res.__("REQUIRED")});
    }
    let isUser = bcrypt.compareSync(req.body.password, data.password);
    if (isUser) {
        const sign = {
            id: data.id,
            role: data.role,
            name: data.name,
        };
        let result = {
            id: data.id,
            role: data.role,
            profile_pic: data.profile_pic,
            name: data.name,
            token: jwt.sign(sign, process.env.JWT_SECRET)
        }
        return res.json({success: true,message: res.__("FOUND"), data: result});
    } else {
        return res.json(res.__("INVALID"));

    }
} catch (error) {
    return res.json(res.__('WRONG'));
}
  }