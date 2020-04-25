const authRouterPG = require("express").Router();
const bcrypt = require("bcryptjs");
const generateToken = require("../middleware/generateToken.js");

const Users = require("./auth-modal");

authRouterPG.get("/", (req, res) => {
  Users.find().then((users) => {
    res.status(200).json(users);
  });
});

authRouterPG.post("/registerClient", async (req, res) => {
  let user = req.body;
  const date = new Date();
  const creationDate = date;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;
  user = { ...user, creationDate };
  return Users.insert(user)
    .then((id) => {
      Users.findById(id).then((user) => {
        delete user.password;
        const token = generateToken(user);
        res.status(201).json({
          message: "user created successfully",
          token,
          user,
        });
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
});

authRouterPG.post(
  "/registerWasher/:id",
  [validateUserId, ifWasherExists],
  (req, res) => {
    const id = req.user.id;
    const newWasher = { ...req.body, userId: Number(id) };
    Users.insertWasher(newWasher)
      .then((id) => {
        Users.findWasherId(id)
          .then((washer) => {
            res.status(201).json({ user: req.user, washer: washer });
          })
          .catch((err) => {
            res
              .status(500)
              .json({ message: "unable to find new washer in database" });
          });
      })
      .catch((err) => {
        res.status(500).json({ message: "unable to add washer" });
      });
  }
);
authRouterPG.get("/washers", (req, res) => {
  Users.findWasher()
    .then((washer) => {
      res.status(200).json(washer);
    })
    .catch((err) => res.status(500).json({ message: "unable to get washers" }));
});
authRouterPG.post("/login", (req, res) => {
  const { email, password } = req.body;
  !email || !password
    ? res.status(403).json({ message: "please povide email and password" })
    : Users.findByEmail(email)
        .then((user) => {
          if (user && bcrypt.compareSync(password, user.password)) {
            delete user.password;
            const token = generateToken(user);
            console.log(user);
            if (user.accountType === "washer") {
              Users.findWasherId(user.id)
                .then((washer) => {
                  console.log(washer);
                  res.status(200).json({ token, user, washer });
                })
                .catch((err) => {
                  res
                    .status(500)
                    .json({ message: "unable to find washer data" });
                });
            } else {
              res.status(200).json({ token, user });
            }
          } else {
            res.status(403).json({ message: "invalid password" });
          }
        })
        .catch((err) => {
          res.status(403).json({ message: "email not registered to user" });
        });
});

// Middleware for auth routes
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

module.exports = authRouterPG;
