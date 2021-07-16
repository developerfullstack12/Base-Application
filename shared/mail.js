var nodemailer = require('nodemailer');
// var config = require('./config');
var senderEmail = process.env.SENDER_EMAIL;
var password = process.env.SENDER_PASSWORD;
var service = process.env.EMAIL_SERVICE;

//--------------------------------------------------------
// Mail Sending Email
//--------------------------------------------------------
var transporter = nodemailer.createTransport({
    service: service,
    port: 465,
    options: {
      debug: true,
    },
    auth: {
        user: senderEmail,
        pass: password
    }
});

// ================================================================
// handle Sendmail
// ================================================================

var sendEMail = (emailId, subject, mailcontent) => {
    let mailOptions = {
        from: `${process.env.APP_NAME} <${senderEmail}>`,
        to: emailId,
        subject: subject,
        html: mailcontent
    };
    return new Promise(function (resolve, reject) {
        transporter.sendMail(mailOptions, function (err, info) {
            //console.log(info);
            if (err) {
                reject(err);
            } else {
                resolve(info);
            }
        });

    });
}

//--------------------------------------------------------
//--------------- Exporting All functions ----------------
//--------------------------------------------------------

module.exports = {
    transporter,
    senderEmail,
    sendEMail
}
//  sendEMail('arun@yopmail.com', 'subject', 'ddmailcontent')