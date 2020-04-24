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

authRouterPG.post("/registerWasher", async (req, res) => {
  let user = req.body;
  const accountType = "washer";
  const date = new Date();
  const creationDate = date;
  const hash = bcrypt.hashSync(user.password, 10); // 2 ^ n
  // console.log(washer);
  user.password = hash;
  user = { ...user, accountType, creationDate };
  // console.log(washer);
  return insertUserPG(user)
    .then((saved) => {
      // a jwt should be generated
      // console.log(saved)
      const token = generateToken(saved);
      res.status(201).json({
        //   user: saved,
        message: "user saved successfully",
        token,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
});

authRouterPG.post("/login", (req, res) => {
  let { email, password } = req.body;
  // console.log('username', username, 'password', password)
  // console.log('req.body', req.body)
  return singleUserForLogin(req.body.email)
    .first()
    .then((user) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        // a jwt should be generated
        const token = generateToken(user);
        // console.log('token', token);
        res.status(200).json({
          message: `Welcome ${user.email}!`,
          userType: `${user.accountType}`,
          firstName: `${user.firstName}`,
          lastName: `${user.lastName}`,
          profilePicture: `${user.profilePicture}`,
          id: `${user.id}`,
          creationDate: `${user.creationDate}`,
          workStatus: `${user.workStatus}`,
          token,
        });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
});

module.exports = authRouterPG;
