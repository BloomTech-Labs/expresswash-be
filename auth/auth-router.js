const authRouter = require('express').Router();
const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
const db = require('../database/dbConfig.js');
const generateToken = require('../middleware/generateToken.js')


authRouter.post('/register', async (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10); // 2 ^ n
    user.password = hash;
  
    return db('users').insert(user)
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
  
  authRouter.post('/login', (req, res) => {
    let { username, password } = req.body;
    // console.log('username', username, 'password', password)
    // console.log('req.body', req.body)
    return db('users').where({username: req.body.username})
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          // a jwt should be generated
          const token = generateToken(user);
          // console.log('token', token);
          res.status(200).json({
            message: `Welcome ${user.username}!`,
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