var mongoose = require('mongoose');
let Address =
{
     address_line1: { type: String, default: "" },
     address_line2: { type: String, default: "" },
     city: { type: String, default: "" },
     state: { type: String, default: "" },
     country: { type: String, default: "" },
     pin: { type: Number },
     reponse: {}

}

let schema = new mongoose.Schema({
     name: { type: String, trim: true },
     email: { type: String, trim: true },
     contact: { type: String, trim: true },
     dob: { type: String, trim: true },
     age: { type: Number, trim: true },
     gender: { type: Number }, //Female=0, Male=1, Other=3,
     password: { type: String, trim: true },
     role: { type: Number, default: 0 },//0=Job Seeker, 1=Sarthi, 2=Recruiter,3=Admin
     status: { type: Number, default: 1 },//1=Enable, 0= Disabled
  
     language_known: { type: Array, trim: true, default: null },
     
     profile_pic: { type: String, trim: true },
    
     profile_status: { type: Number, default: 0 }, //Set 0-100 as per the field
    
     address: [
          Address
     ],
     address_work: { type: String },
     address_current: { type: String },
     address_home: { type: String },
     
     token: {type: String, default: null},
     created_by:{type:String},
     updated_by:{type:String},
     created_at: {
          type: Date,
          default: Date.now
     },
     updated_at: { type: Date }
});

exports.User = mongoose.model('User', schema);
