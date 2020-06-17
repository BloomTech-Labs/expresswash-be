const router = require("express").Router();
const sendEmail = require("./email");
const Users = require("../users/users-model");
router.post("/send-email", checkId, (req, res) => {
  const { clientId } = req.body;
<<<<<<< HEAD
  const subject = "Expresswash Notification";
  const text = "Your job has been completed!";
=======
  const subject = "Finally it is working";
  const text = "Here is your email that I finally got working";
>>>>>>> email service implemented but sending email twice atm
  Users.findById(clientId).then((user) => {
    sendEmail(user.email, subject, text, (err, data) => {
      if (err) {
        res.status(500).json({ message: "internal error", err });
      } else {
<<<<<<< HEAD
        res.status(200).json({ message: "Succesful!" });
=======
        res.status(200).json({ message: data });
>>>>>>> email service implemented but sending email twice atm
      }
    });
  });
});

function checkId(req, res, next) {
  const { clientId } = req.body;

  Users.findById(clientId)
    .then((user) => {
      if (user) {
        req.user = user;
<<<<<<< HEAD
        delete req.user.password;
=======
>>>>>>> email service implemented but sending email twice atm
        next();
      } else {
        res.status(404).json({
          message: `there is no user with id of ${clientId}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "there was an error processing the request",
        error: err.message,
      });
    });
}

module.exports = router;
