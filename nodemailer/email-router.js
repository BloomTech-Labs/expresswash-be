const router = require('express').Router();
const sendEmail = require('./email');
const Users = require('../users/users-model');

router.post('/send-email', checkId, (req, res) => {
  const { clientId } = req.body;

  const subject = 'Express Wash Notification';

  const text = 'Your job has been completed!';
  Users.findById(clientId).then((user) => {
    sendEmail(user.email, subject, text, user, (err, data) => {
      if (err) {
        res.status(500).json({ message: 'internal error', err });
      } else {
        res.status(200).json({ message: 'Succesful!' });
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
        delete req.user.password;
        next();
      } else {
        res.status(404).json({
          message: `there is no user with id of ${clientId}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: 'there was an error processing the request',
        error: err.message,
      });
    });
}

module.exports = router;
