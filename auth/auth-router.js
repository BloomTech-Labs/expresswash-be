const authRouter = require('express').Router();
const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
const db = require('../database/dbConfig.js');
const generateToken = require('../middleware/generateToken.js')

authRouter.get('/users', async (req, res) => {
  const users = await db('users').select('email');
  return res.status(200).json(users);
});

authRouter.post('/registerClient', async (req, res) => {
    let client = req.body;
    const accountType = "client";
    const date = new Date();
    const creationDate = date
    const hash = bcrypt.hashSync(client.password, 10); // 2 ^ n
    // console.log(client);
    client.password = hash;
    client = { ...client, accountType, creationDate };
    // console.log(client);
    return db('users').insert(client)
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
  
  authRouter.post('/registerWasher', async (req, res) => {
    let washer = req.body;
    const accountType = "washer";
    const date = new Date();
    const creationDate = date
    const hash = bcrypt.hashSync(washer.password, 10); // 2 ^ n
    // console.log(washer);
    washer.password = hash;
    washer = { ...washer, accountType, creationDate };
    // console.log(washer);
    return db('users').insert(washer)
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

  // authRouter.post('/loginClient', (req, res) => {
  //   let { email, password } = req.body;
  //   // console.log('username', username, 'password', password)
  //   // console.log('req.body', req.body)
  //   return db('users').where({email: req.body.email})
  //     .first()
  //     .then(user => {
  //       if (user && bcrypt.compareSync(password, user.password)) {
  //         // a jwt should be generated
  //         const token = generateToken(user);
  //         // console.log('token', token);
  //         res.status(200).json({
  //           message: `Welcome ${user.email}!`,
  //           token
  //         });
  //       } else {
  //         res.status(401).json({ message: 'Invalid Credentials' });
  //       }
  //     })
  //     .catch(error => {
  //       console.log(error);
  //       res.status(500).json(error);
  //     });
  // });

  authRouter.post('/login', (req, res) => {
    let { email, password } = req.body;
    // console.log('username', username, 'password', password)
    // console.log('req.body', req.body)
    return db('users').where({email})
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
  
  // for successful registration and login
  // function generateToken(user) {
  //   // header payload and verify signature
  //   // payload -> username, id, department, expiration date
  //   // verify signature -> a secret
  //   // console.log(user);
  //   const payload = {
  //     sub: user.id,
  //     username: user.username,
  //   };
    
  //   const options = {
  //     expiresIn: '1d',
  //   };
  
  //   return jwt.sign(payload, process.env.JWT_SECRET, options);
  // }
  
  module.exports = authRouter;