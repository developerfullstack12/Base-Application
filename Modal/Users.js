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
let companies = {
     company_logo: { type: String, trim: true },
     company_name: { type: String, trim: true },
     company_id: { type: String, trim: true },
     job_id: { type: String, trim: true },
     job_title: { type: String, trim: true },
     salary_from: { type: Number, trim: true },
     salary_to: { type: Number, trim: true },
     job_location: { type: String, trim: true },//City or pin code
     category: { type: mongoose.Types.ObjectId, ref: 'JobCategory' },
     job_status: { type: Number, enum: [0, 1, 2], default: 0 },//Open = 0, Complete=1, Close=2
     openings: { type: Number, trim: true },
     skills: { type: String, trim: true },
     shift: { type: Number, enum: [0, 1, 2,3], default: 0 },//Field =0, 1=office, 2=morning, 3=night
     description: { type: String, trim: true },
     animated_description: { type: String, trim: true },
     gender: { type: Number, enum: [0, 1, 2, 3], default: 0 }, //All=0, Female=1, Male=2, Other=3,
     exp_year: { type: Number },
     exp_month: { type: Number },
     status: {
          type: String,
          enum: ['Visited', 'Applied', 'Saved', 'Selected', 'Withdrow','Hired','Rejected'],
          default: null
     },//0=Visited, 1=Applied, 2=Saved, 3=Selected, 4=Withdrow,
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
     qualification: { type: Number, trim: true }, //Below 10th=0, 10th pass=1, 12 pass =2, Graduate and above =3
     educational_info: [{
          institution_name: { type: String, default: null },//School or college name
          class_name: { type: String, default: null },
          total_marks: { type: String, default: null },
          obtain_marks: { type: String, default: null },
          persent: { type: String, default: null },
     }],
     language_known: { type: Array, trim: true, default: null },
     experience: { type: Number }, // 0-6 Month = 0, 1-2 Year = 1,  2-5 Year = 2, 5+ year = 3
     about_me: { type: Array, default: null },
     job_category: { type: String }, //Incase of job seeker
     company_category: { type: String }, //Incase of company
     job_intrested: [{ type: Array }], //Incase of job seeker
     job_applied: [{ type: Array }], //Incase of job seeker
     job_selected: [{ type: Array }], //Incase of job seeker
     job_saved: [{ type: Array }], //Incase of job seeker
     job_withdraw: [{ type: Array }], //Incase of job seeker
     job_location: { type: String }, //Incase of job seeker
     company_name: { type: String, trim: true }, //Incase of job seeker
     isExp: { type: Boolean, default: 1 },
     profile_pic: { type: String, trim: true },
     video_resume: { type: String, trim: true },
     profile_status: { type: Number, default: 0 }, //Set 0-100 as per the field
     emp_code: { type: String, default: null },
     address: [
     ],
     address_work: { type: String },
     address_current: { type: String },
     address_home: { type: String },
     skills: {
          General: { type: String, default: null },
          Specific: { type: String, default: null }

     },
     jobs: [companies],//Incase of job seeker
     token: {type: String, default: null},
     speak_english:{type: String},
     created_by:{type:String},
     updated_by:{type:String},
     created_at: {
          type: Date,
          default: Date.now
     },
     updated_at: { type: Date }
});

exports.User = mongoose.model('User', schema);
