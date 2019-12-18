const authRouterPG = require('express').Router();
const bcrypt = require('bcryptjs');
const generateToken = require('../middleware/generateToken.js')

const queries = require('../database/queries.js');
const { insertUserPG, singleUserForLogin } = require('../database/queries.js')

authRouterPG.get('/', (req, res) => {
    queries.getAllUsers().then((users) => {
        res.json(users);
    });
});

authRouterPG.post('/registerClient', async (req, res) => {
    let user = req.body;
    const accountType = "client";
    const date = new Date();
    const creationDate = date
    const hash = bcrypt.hashSync(user.password, 10); // 2 ^ n
    // console.log(client);
    user.password = hash;
    user = { ...user, accountType, creationDate };
    // console.log(client);
    return insertUserPG(user)
        .then(saved => {
            // a jwt should be generated
            const token = generateToken(saved);
            res.status(201).json({
                user: saved,
                token
            });
        })
      .catch(error => {
        console.log(error);
        res.status(500).json(error);
      });
});

authRouterPG.post('/registerWasher', async (req, res) => {
    let user = req.body;
    const accountType = "washer";
    const date = new Date();
    const creationDate = date
    const hash = bcrypt.hashSync(user.password, 10); // 2 ^ n
    // console.log(washer);
    user.password = hash;
    user = { ...user, accountType, creationDate };
    // console.log(washer);
    return insertUserPG(user)
      .then(saved => {
        // a jwt should be generated
        const token = generateToken(saved);
        res.status(201).json({
          user: saved,
          token
        });
      })
      .catch(error => {
        console.log(error);
        res.status(500).json(error);
      });
  });


  authRouterPG.post('/login', (req, res) => {
    let { email, password } = req.body;
    // console.log('username', username, 'password', password)
    // console.log('req.body', req.body)
    return singleUserForLogin(req.body.email)
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          // a jwt should be generated
          const token = generateToken(user);
          // console.log('token', token);
          res.status(200).json({
            message: `Welcome ${user.email}!`,
            userType:`${user.accountType}`,
            firstName:`${user.firstName}`,
            lastName:`${user.lastName}`,
            profilePicture:`${user.profilePicture}`,
            id:`${user.id}`,
            creationDate:`${user.creationDate}`,
            workStatus:`${user.workStatus}`,
            token
          });
        } else {
          res.status(401).json({ message: 'Invalid Credentials' });
        }
      })
      .catch(error => {
        console.log(error);
        res.status(500).json(error);
      });
  });

module.exports = authRouterPG;