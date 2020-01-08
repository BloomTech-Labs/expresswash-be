const usersRouter = require("express").Router();
const bcrypt = require("bcryptjs");
const Users = require("../users/users-model.js");

usersRouter.get("/", (req, res) => {
  Users.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      console.log("this is get users err", err);
      res.status(500).send(err);
    });
});

usersRouter.get("/:id", [checkId], (req, res) => {
  res.status(200).json(req.user);
});

usersRouter.put("/:id", [checkId], (req, res) => {
  Users.update(req.params.id, req.body)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({
          message: "the user could not be updated"
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        message: "there was an error processing the request"
      });
    });
});

// MIDDLEWARE TO CHECK AN ID ACTUALLY EXISTS
function checkId(req, res, next) {
  const { id } = req.params;
  Users.findById(id)
    .then(user => {
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(404).json({
          message: "there is no user with the given id"
        });
      }
    })
    .catch(err => {
      console.log("this is err on findbyid", err);
      res.status(500).json({
        message: "there was an error processing the request"
      });
    });
}

module.exports = usersRouter;
