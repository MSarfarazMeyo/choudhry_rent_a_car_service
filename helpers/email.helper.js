var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'cl9nepay@gmail.com',
        pass: 'cqmowlohxbkuhptn'
    }
});

module.exports = ({ to, subject, text }) => {
    var mailOptions = {
        from: 'cl9nepay@gmail.com',
        to,
        subject,
        text
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return false
        } else {
            return true
        }
    });

}