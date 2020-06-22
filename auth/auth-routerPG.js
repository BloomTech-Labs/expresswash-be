const authRouterPG = require('express').Router();
const bcrypt = require('bcryptjs');
const { generateToken } = require('../middleware/globalMiddleWare');
const { validateUserId, ifWasherExists } = require('./auth-middleware');
const Users = require('./auth-modal');

authRouterPG.get('/', (req, res) => {
  Users.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(500).json({ message: 'unable to get all users' });
    });
});

authRouterPG.post('/registerClient', (req, res) => {
  let user = req.body;
  const date = new Date();
  const creationDate = date.toLocaleDateString();
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;
  user = { ...user, creationDate };
  return Users.insert(user)
    .then((user2) => {
      const newUser = user2;
      delete newUser.password;
      const token = generateToken(newUser);
      res.status(201).json({
        message: 'user created successfully',
        token,
        user: newUser,
      });
    })
    .catch((error) => {
      res.status(500).json({ message: 'unable to register new user' });
    });
});

authRouterPG.post(
  '/registerWasher/:id',
  [validateUserId, ifWasherExists],
  (req, res) => {
    if (req.user.accountType === 'washer') {
      const id = req.user.id;
      const newWasher = { ...req.body, userId: Number(id) };
      Users.insertWasher(newWasher)
        .then((washer) => {
          res.status(201).json({
            user: {
              ...req.user,
              washer: {
                ...washer,
                currentLocationLat: parseFloat(washer.currentLocationLat),
                currentLocationLon: parseFloat(washer.currentLocationLon),
                rateSmall: parseFloat(washer.rateSmall),
                rateMedium: parseFloat(washer.rateMedium),
                rateLarge: parseFloat(washer.rateLarge),
              },
            },
          });
        })
        .catch((err) => {
          res.status(500).json({ message: 'unable to add washer' });
        });
    } else {
      res
        .status(403)
        .json({ message: 'user does not have an account type of washer' });
    }
  }
);
authRouterPG.get('/washers', (req, res) => {
  Users.findWasher()
    .then((washer) => {
      res.status(200).json(washer);
    })
    .catch((err) => res.status(500).json({ message: 'unable to get washers' }));
});
authRouterPG.post('/login', (req, res) => {
  const { email, password } = req.body;
  !email || !password
    ? res
        .status(403)
        .json({ message: 'email and password fields cannot be blank' })
    : Users.findByEmail(email)
        .then((user) => {
          if (user && bcrypt.compareSync(password, user.password)) {
            delete user.password;
            const token = generateToken(user);
            if (user.accountType === 'washer') {
              Users.findWasherId(user.id)
                .then((washer) => {
                  res.status(200).json({
                    token,
                    user: {
                      ...user,
                      washer: {
                        ...washer,
                        currentLocationLat: parseFloat(
                          washer.currentLocationLat
                        ),
                        currentLocationLon: parseFloat(
                          washer.currentLocationLon
                        ),
                        rateSmall: parseFloat(washer.rateSmall),
                        rateMedium: parseFloat(washer.rateMedium),
                        rateLarge: parseFloat(washer.rateLarge),
                      },
                    },
                  });
                })
                .catch((err) => {
                  res
                    .status(500)
                    .json({ message: 'unable to find washer data' });
                });
            } else {
              res.status(200).json({ token, user });
            }
          } else {
            res.status(403).json({ message: 'invalid email and/or password' });
          }
        })
        .catch((err) => {
          res.status(403).json({ message: 'email not registered to user' });
        });
});

module.exports = authRouterPG;
