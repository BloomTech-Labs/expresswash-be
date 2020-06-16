const nodemailer = require('nodemailer');
require('dotenv').config();

let transporter = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
    user: process.env.HOTMAIL_EMAIL,
    pass: process.env.HOTMAIL_PASSWORD,
  },
});
const sendEMail = (to, subject, text, cb) => {
  let mailOptions = {
    from: 'expresswash09@hotmail.com',
    to,
    subject,
    text,
  };

  transporter.sendMail(mailOptions, (err, data) => {
    console.log(data);
    if (err) {
      cb(err, null);
    } else {
      cb(null, data);
    }
  });
};

module.exports = sendEMail;
