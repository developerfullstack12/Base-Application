const fs = require('fs');
const AWS = require('aws-sdk');//FOR SMS
exports.err = (err) => {
    return { success: false, message: "Something went wrong", error: err };
};
exports.getRandomInt = () => {
    // return Math.floor(1000 + Math.random() * 9000);
    return 1234;
};

exports.deleteFile = (urls) => {
    if (fs.existsSync(urls)) {
        fs.unlinkSync(urls);
    }
}

exports.calculateAge = (dateString) => { // birthday is a date
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();

    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}
exports.sendOTP = (mobileNo, OTP) => {
    mobileNo = `+91${mobileNo.trim()}`;
    var params =
    {
        Message: "Welcome! Your mobile verification code is: " + OTP +
            " Mobile Number is: " + mobileNo, /* required */
        PhoneNumber: mobileNo,
    };
    return new AWS.SNS({ apiVersion: '2010–03–31' }).publish(params).promise()
        .then(message => {
         console.log("********", message);
            return message
        }).
        catch(err => {
            console.log("****###****", err);
            return err
        });
}
// this.sendOTP("+919516686046", 1234);

