var express = require('express');
var bcrypt = require('bcrypt');
var { getRandomInt } = require('../shared/functions');
var { User } = require('../Modal/Users');
const jwt = require('jsonwebtoken');
var {authUser, commonHeader} = require('./middleware');
var router = express.Router();

/**
 * 
 * Created At : 21/12/2020
 */
router.post('/', async (req, res) => {
    try {
        let data = await User.findOne({ email: req.body.email, status: 1 }).select('email password role profile_pic profile_status');
        let ta =[{
            ab:54309,
            dd:'sfsf'
        }]
        if (!data) {
            return res.json({ta,message: res.__("REQUIRED")});
        }
        let isUser = bcrypt.compareSync(req.body.password, data.password);
        if (isUser) {
            const sign = {
                //exp: Math.floor(Date.now() / 1000) + config.jwtExpire, // expire time
                _id: data._id,
                role: data.role,
                name: data.name,
            };
            AUTH.LOGGED_IN['data'] = {
                _id: data._id,
                role: data.role,
                profile_pic: data.profile_pic,
                profile_status: data.profile_status,
                name: data.name,
                token: jwt.sign(sign, process.env.JWT_SECRET)
            }
            return res.json(AUTH.LOGGED_IN);
        } else {
            return res.json(AUTH.INVALID);
        }
    } catch (error) {
        return res.json(error);
    }
});


router.post('/confirm', async (req, res) => {
    if (!req.body.otp || !req.body.contact) {
        return res.json(COMMON.REQUIRED);
    }
    try {
        let data = await User.findOne({
            contact: req.body.contact,
        }).select('email password role profile_pic profile_status token');
        if (!data && !data.token) {
            return res.json(AUTH.INVALID_OTP);
        }
        if (req.body.otp.trim() != data.token) {
            return res.json(AUTH.INVALID_OTP);
        }
        if (data) {
            const sign = {
                //exp: Math.floor(Date.now() / 1000) + config.jwtExpire, // expire time
                _id: data._id,
                role: data.role,
                name: data.name,
            };
            AUTH.LOGGED_IN['data'] = {
                _id: data._id,
                role: data.role,
                profile_pic: data.profile_pic,
                profile_status: data.profile_status,
                name: data.name,
                token: jwt.sign(sign, process.env.JWT_SECRET)
            }
            await User.findByIdAndUpdate(data._id, { token: null });
            return res.json(AUTH.LOGGED_IN);
        }
    } catch (error) {
        console.log("error", error);
        return res.json(err(error));
    }
});
/**
 * 
 * Created At : 21/12/2020
 */
router.post('/admin', async (req, res) => {
    try {
        let data = await User.findOne({ email: req.body.email, status: 1 }).select('email password role profile_pic');
        if (!data) {
            return res.json(AUTH.INVALID);
        }
        let isUser = bcrypt.compareSync(req.body.password, data.password);
        if (isUser) {
            const sign = {
                //exp: Math.floor(Date.now() / 1000) + config.jwtExpire, // expire time
                _id: data._id,
                role: data.role,
                name: data.name,
            };
            AUTH.LOGGED_IN['data'] = {
                _id: data._id,
                role: data.role,
                profile_pic: data.profile_pic,
                name: data.name,
                token: jwt.sign(sign, process.env.JWT_SECRET)
            }
            return res.json(AUTH.LOGGED_IN);
        } else {
            return res.json(AUTH.INVALID);
        }
    } catch (error) {
        console.log(error);
        return res.json(err(error));
    }
});

module.exports = router;
