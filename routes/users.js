var express = require('express');
var bcrypt = require('bcrypt');
var { deleteFile, getRandomInt, calculateAge, sendOTP } = require('../shared/functions');
var { User } = require('../Modal/Users');
const multer = require('multer');
var router = express.Router();

const storage = multer.diskStorage({

  destination: (req, file, cb) => {
    if (file.fieldname == 'video_resume') {
      cb(null, 'public/uploads/videos')
    }
    if (file.fieldname == 'profile_pic') {
      cb(null, 'public/uploads/profiles')
    }
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname)
  }
});
var profilePic = multer({ storage: storage }).any();

/**
 * 
 * Created At : 21/12/2020
 */
router.get('/', async (req, res) => {
  try {
    let data = await User.findById(req.query._id).select('-password');
    if (!data) {
      return res.status(status.NOT_FOUND).json(res.__("NOT_FOUND"));
    }
    res.__("FOUND").data = data;
    return res.status(status.OK).json(res.__("FOUND"));
  } catch (error) {
    return res.json(res.__('WRONG'));
  }
});

/**
 * Get all users
 * 
 * Created At : 15/02/2021
 */
router.get('/all', async (req, res) => {
  try {
    let page = 0;
    let pageSize = 100;
    if (req.query.page) {
      page = Number(req.query.page.trim())
    }
    if (req.query.pageSize && req.query.pageSize < 100) {
      pageSize = Number(req.query.pageSize.trim());
    }
    let count = await User.count();
    if (count < 1) {
      return res.status(status.NOT_FOUND).json(res.__("NOT_FOUND"));
    }
    let result = await User.find().select("-password").skip((page * pageSize)).limit(pageSize);
    if (req.query.search && req.query.search != "") {
      result = await User.find({ name: { $regex: req.query.search } }).select("-password");
    }

    if (result.length > 0) {
      let data = res.__('FOUND');
      data.count = count;
      data.data = result;
      res.status(status.OK).json(data);
      delete res.__('FOUND').count;

    } else {
      res.status(status.NOT_FOUND).json(res.__('NOT_FOUND'));
      delete res.__('FOUND').count;
    }
  } catch (error) {
    return res.status(status.INTERNAL_SERVER_ERROR).json(res.__('WRONG'));
  }
});

/**
 * Get all users
 * 
 * Created At : 15/02/2021
 */
router.get('/creator', async (req, res) => {
  if (!req.query._id) {
    return res.status(status.NOT_FOUND).json(res.__('REQUIRED'));
  }
  try {
    let page = 0;
    let pageSize = 100;
    if (req.query.page) {
      page = Number(req.query.page.trim())
    }
    if (req.query.pageSize && req.query.pageSize < 100) {
      pageSize = Number(req.query.pageSize.trim());
    }
    let count = await User.count({ create_by: req.query._id });
    if (count < 1) {
      return res.status(status.NOT_FOUND).json(res.__("NOT_FOUND"));
    }
    let result = await User.find({ create_by: req.query._id }).select("-password").skip((page * pageSize)).limit(pageSize);
    if (req.query.search && req.query.search != "") {
      result = await User.find({ create_by: req.query._id, name: { $regex: req.query.search } }).select("-password");
    }

    if (result.length > 0) {
      let data = res.__('FOUND');
      data.count = count;
      data.data = result;
      res.status(status.OK).json(data);
      delete res.__('FOUND').count;

    } else {
      res.status(status.NOT_FOUND).json(res.__('NOT_FOUND'));
      delete res.__('FOUND').count;
    }
  } catch (error) {
    // console.log(";;;;", error);
    return res.status(status.INTERNAL_SERVER_ERROR).json(res.__('WRONG'));
  }
});

/**
 * Edit for all user
 * 
 * Created At : 21/12/2020
 * Updated At : 04/01/2021
 */
router.put('/', profilePic, async (req, res) => {
  if (!req.body._id) {
    return res.status(status.BAD_REQUEST).json(res.__("REQUIRED"));
  }
  let user = await User.findById(req.body._id).select('_id profile_pic video_resume jobs');
  if (!user) {
    return res.status(status.NOT_FOUND).json(res.__("NOT_FOUND"));
  }
  if (req.body.contact) {
    if (req.body.contact.length != 10) {
      return res.status(status.BAD_REQUEST).json(res.__("MOBILE_NUMBER"));
    }

    let isContact = await User.findOne({ _id: { $ne: req.body._id }, contact: req.body.contact }).select('contact');
    if (isContact) {
      return res.status(status.BAD_REQUEST).json(res.__("ALREADEY_CONTACT"));
    }
  }
  if (req.body.email) {
    let isEmail = await User.findOne({ _id: { $ne: req.body._id }, email: req.body.email }).select('email');
    if (isEmail) {
      return res.status(status.BAD_REQUEST).json(res.__("ALREADEY_EMAIL"));
    }
  }

  let jobs = [];
  if (req.body.educational_info && req.body.educational_info.length > 0) {
    req.body.educational_info = JSON.parse(req.body.educational_info);
  }

  if (req.body.applied && req.body.applied.length > 0) {
    req.body.applied = JSON.parse(req.body.applied);
  }
  if (req.body.about_me && req.body.about_me.length > 0) {
    req.body.about_me = JSON.parse(req.body.about_me);
  }
  if (!user) {
    if (req.files && req.files.length > 0) {
      req.files.map(f => {

        if (f.fieldname == "profile_pic") {
          deleteFile("public/uploads/profiles/" + f.filename);
        } else {
          deleteFile("public/uploads/videos/" + f.filename);
        }
      });
    }
    return res.json(USER_MSG.NOT_FOUND);
  }
  //=================
  let filePath = req.protocol + "://" + req.get('host');

  if (req.files && req.files.length > 0) {
    req.files.map(f => {
      if (f.fieldname == "profile_pic") {
        req.body.profile_pic = filePath + "/uploads/profiles/" + f.filename;
        if (user && user.profile_pic && (f.filename != user.profile_pic)) {
          let filePath = user.profile_pic.split("uploads")[1];
          deleteFile("public/uploads" + filePath);
        }
      } else {
        req.body.video_resume = filePath + "/uploads/videos/" + f.filename;
        if (user && user.video_resume && (f.filename != user.video_resume)) {
          let filePath = user.video_resume.split("uploads")[1];
          deleteFile("public/uploads" + filePath);
        }
      }
    });
  }

  try {
    if (req.body.password) {
      delete req.body.password;
    }
    if (req.body.dob) {
      req.body.age = calculateAge(req.body.dob)
    }
    if (req.body.jobs) {
      jobs = user.jobs;
      let body = JSON.parse(req.body.jobs);
      jobs.push(body);
      req.body.jobs = jobs
      delete req.body.role;
      let jobResult = await Job.findOneAndUpdate({ _id: body.job_id, "users.user_id": req.body._id }, { "users.$.user_id": req.body._id, "users.$.status": body.status }, { new: true });
      if (!jobResult) {
        await Job.findByIdAndUpdate(body.job_id, { users: [{ user_id: req.body._id, status: body.status }] }, { new: true });
      }


      let data = await User.findOneAndUpdate({ _id: req.body._id, "jobs.job_id": body.job_id }, { "jobs.$.status": body.status }, { new: true });
      if (!data) {
        await User.findOneAndUpdate({ _id: req.body._id }, { "jobs": jobs }, { new: true });
      }
    }
    delete req.body.jobs

    let data = await User.findByIdAndUpdate(req.body._id, req.body, { new: true }).select('-password');
    res.__('UPDATED').data = data;
    return res.status(status.OK).json(res.__('UPDATED'));
  } catch (error) {
    res.__('WRONG').error = error;
    return res.json(res.__('WRONG'));
  }
});

/**
 * Created At : 21/12/2020
 */
router.put('/reset', async (req, res) => {
  try {
    if (!req.body._id || !req.body.old_password || !req.body.password || !req.body.cpassword) {
      return res.json(COMMON.REQUIRED);
    }
    if (req.body.password != req.body.cpassword) {
      return res.json(AUTH.MISS_PASSWORD);
    }
    let user = await User.findById(req.body._id).select('password');
    if (!user) {
      return res.json(USER_MSG.NOT_FOUND);
    }
    let isUser = bcrypt.compareSync(req.body.old_password, user.password);
    if (!isUser) {
      return res.json(AUTH.INCORRECT_PASSWORD);
    }
    await User.findByIdAndUpdate(req.body._id, { password: bcrypt.hashSync(req.body.password, 10) });
    return res.json(AUTH.RESET_SUCCESS);
  } catch (error) {
    console.log(";;;;", error);
    return res.json(err(error));
  }
});

/**
 * Created At : 21/12/2020
 */
router.post('/verify', async (req, res) => {
  if (!req.body.contact) {
    return res.status(status.BAD_REQUEST).json(res.__('REQUIRED'));
  }
  try {
    let random = getRandomInt();
    let data = await User.findOneAndUpdate({ contact: req.body.contact, role: 0 }, { token: random }, { new: true });
    if (data) {
      try {
        sendOTP(req.body.contact, random);
        
      } catch (error) {
      }
      setTimeout(async () => {
        await User.findOneAndUpdate({ contact: req.body.contact, role: 0 }, { token: null });
      }, 30 * 60 * 1000);

      return res.json(res.__("OTP_SEND"));
    } else {
      
      return res.status(status.BAD_REQUEST).json(res.__('NOT_FOUND'));
    }

  } catch (error) {
    console.log(";;;;", error);
    return res.status(status.INTERNAL_SERVER_ERROR).json(res.__('WRONG'));
  }
});

router.post('/confirm', async (req, res) => {
  if (!req.body.otp || !req.body.contact) {
    return res.status(status.BAD_REQUEST).json(res.__('REQUIRED'));
  }
  try {
    let data = await User.findOne({
      contact: req.body.contact,
      token: req.body.otp
    }).select('_id data');
    if (!data) {
      return res.json(res.__('INVALID_OTP'));
    }

    if (!data) {
      return res.json(res.__('NOT_FOUND'));
    }

    await User.findByIdAndUpdate(data._id, { token: null });
    return res.json(res.__('VALIDATED'));
  } catch (error) {
    console.log("error", error);
    return res.status(status.INTERNAL_SERVER_ERROR).json(res.__('WRONG'));
  }
});
module.exports = router;
