// Middleware for auth routes
const Users = require("./auth-modal");
module.exports = {
  validateUserId,
  ifWasherExists,
};
function validateUserId(req, res, next) {
  Users.findById(req.params.id).then((user) => {
    if (user) {
      delete user.password;
      req.user = user;
      next();
    } else {
      res.status(400).json({ message: "invalid user id" });
    }
  });
}

function ifWasherExists(req, res, next) {
  Users.findWasherId(req.params.id).then((washer) => {
    if (washer) {
      res.status(400).json({ message: "user already registered as a washer" });
    } else {
      next();
    }
  });
}
