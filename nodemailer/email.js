const nodemailer = require('nodemailer');
require('dotenv').config();
const { Hello } = require('./email-template');
let transporter = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
    user: process.env.HOTMAIL_EMAIL,
    pass: process.env.HOTMAIL_PASSWORD,
  },
});
const sendEMail = (to, subject, text, data, cb) => {
  let mailOptions = {
    from: 'expresswash09@hotmail.com',
    to,
    subject,
    text,
    html: Hello(data),
  };

  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, data);
    }
  });
};

module.exports = sendEMail;
