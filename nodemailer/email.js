const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USERNAME,
    pass: process.env.GMAIL_PASSWORD,
  },
});

let mailOptions = {
  from: "expresswash09@gmail.com",
  to: "jeffreymartespolanco@hotmail.com",
  subject: "testing",
  text: "hello thereee",
};

transporter.sendMail(mailOptions, (err, data) => {
  if (err) {
    console.log("yoooo", err);
  } else {
    console.log("workiiingg");
  }
});
