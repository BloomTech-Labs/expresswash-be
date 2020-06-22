const usersRouter = require('express').Router();
const { findWasherId } = require('../auth/auth-modal');
const Users = require('../users/users-model.js');
const stripe = require('stripe')(process.env.STRIPE_SECRET);

// iOS stripe endpoint with - paymentIntent
usersRouter.post('/payment-intent', async (req, res) => {
  const { amount, currency } = req.body;
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: currency,
  });

  // Send publishable key and PaymentIntent details to client
  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    clientSecret: paymentIntent.client_secret,
  });
});

// make payment for job - using stripe checkout on frontend
usersRouter.post('/payment', (req, res) => {
  const { product, token } = req.body;

  return stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      stripe.charges.create(
        {
          amount: product.price * 100,
          currency: 'usd',
          customer: customer.id,
          receipt_email: token.email,
          description: product.name,
        },
        (err, charge) => {
          if (err) {
            res.status(500).send(err.message);
          }
          res.status(200).json(charge);
        }
      );
    })
    .catch((err) => res.status(500).send(err.message));
});

// Return all users
usersRouter.get('/', (req, res) => {
  Users.find()
    .then((users) => {
      users.map((user) => {
        delete user.password;
        return user;
      });
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// Return user by id - firstName, lastName, email, phoneNumber, and the cars that are linked to that user
usersRouter.get('/:id', checkId, (req, res) => {
  delete req.user.password;
  Users.getUserCars(req.params.id).then((cars) =>
    findWasherId(req.user.id).then((washer) => {
      washer
        ? res.status(200).json({
            ...req.user,
            cars,
            washer: {
              ...washer,
              currentLocationLat: parseFloat(washer.currentLocationLat),
              currentLocationLon: parseFloat(washer.currentLocationLon),
              rateSmall: parseFloat(washer.rateSmall),
              rateMedium: parseFloat(washer.rateMedium),
              rateLarge: parseFloat(washer.rateLarge),
            },
          })
        : res.status(200).json({ ...req.user, cars });
    })
  );
});

// Add rating to user profile
usersRouter.put('/rating/:id', (req, res) => {
  const id = req.params.id;
  Users.findById(id)
    .then((user) => {
      const { userRating, userRatingTotal } = user;
      if (userRatingTotal > 0) {
        const total = userRatingTotal * userRating + req.body.userRating;
        const newUserRatingTotal = userRatingTotal + 1;
        const newRating = total / newUserRatingTotal;
        Users.update(id, {
          userRatingTotal: newUserRatingTotal,
          userRating: newRating,
        })
          .then((user) => {
            res.status(201).json(user);
          })
          .catch((err) => {
            res.status(500).json({
              message: 'error in updating the user',
              error: err.message,
            });
          });
      } else {
        // adds rating if it is the first one for the user
        Users.update(id, { userRating: req.body.userRating })
          .then((user) => {
            res.status(201).json(user);
          })
          .catch((err) => {
            res.status(500).json({
              message: 'error updating the user rating',
              error: err.message,
            });
          });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: `user with the id ${req.params.id} does not exist` });
    });
});
//Add rating to washer profile
usersRouter.put('/washer/rating/:id', (req, res) => {
  const id = req.params.id;
  Users.findByWasherId(id)
    .then((washer) => {
      const { washerRating, washerRatingTotal } = washer;
      if (washerRatingTotal > 0) {
        const total = washerRatingTotal * washerRating + req.body.washerRating;
        const newWasherRatingTotal = washerRatingTotal + 1;
        const newRating = total / newWasherRatingTotal;
        Users.updateWasher(id, {
          washerRatingTotal: newWasherRatingTotal,
          washerRating: newRating,
        })
          .then((user) => {
            res.status(201).json({
              ...user,
              currentLocationLat: parseFloat(user.currentLocationLat),
              currentLocationLon: parseFloat(user.currentLocationLon),
              rateSmall: parseFloat(user.rateSmall),
              rateMedium: parseFloat(user.rateMedium),
              rateLarge: parseFloat(user.rateLarge),
            });
          })
          .catch((err) => {
            res.status(500).json({ message: 'error in updating the washer' });
          });
      } else {
        // adds rating if it is the first on for the washer
        Users.updateWasher(id, { userRating: req.body.userRating })
          .then((user) => {
            res.status(201).json(user);
          })
          .catch((err) => {
            res
              .status(500)
              .json({ message: 'error updating the washer rating' });
          });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: `washer with the id ${req.params.id} does not exist`,
      });
    });
});

// Delete User by Id
usersRouter.delete('/:id', checkId, (req, res) => {
  const { id } = req.params;
  Users.del(id)
    .then((removed) => {
      res.status(200).json({
        message: `The user has been successfully removed from the database`,
      });
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});

// Update user data by id
usersRouter.put('/:id', checkId, (req, res) => {
  Users.update(req.params.id, req.body)
    .then((user) => {
      if (user) {
        delete user[0].password;
        res.status(200).json(user[0]);
      } else {
        res.status(404).json({
          message: 'the user could not be updated',
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: 'there was an error processing the request',
        error: err.message,
      });
    });
});

usersRouter.put('/washer/:id', (req, res) => {
  const washerId = req.params.id;
  const changes = req.body;
  Users.findByWasherId(washerId)
    .then((washer) => {
      Users.updateWasher(washerId, changes)
        .then((edited) => {
          res.status(201).json({
            ...edited,
            currentLocationLat: parseFloat(edited.currentLocationLat),
            currentLocationLon: parseFloat(edited.currentLocationLon),
            rateSmall: parseFloat(edited.rateSmall),
            rateMedium: parseFloat(edited.rateMedium),
            rateLarge: parseFloat(edited.rateLarge),
          });
        })
        .catch((err) => res.status(500).json(err.message));
    })
    .catch((err) => {
      res.status(404).json({ message: 'Unable to find washer' });
    });
});

usersRouter.get('/available/:city', async (req, res) => {
  const city = req.params.city.toLowerCase();
  Users.getAvailableWashers(city)
    .then((washers) => {
      if (washers) {
        const returnWashers = washers.map((item) => {
          delete item.password;
          return {
            ...item,
            currentLocationLat: parseFloat(item.currentLocationLat),
            currentLocationLon: parseFloat(item.currentLocationLon),
            rateSmall: parseFloat(item.rateSmall),
            rateMedium: parseFloat(item.rateMedium),
            rateLarge: parseFloat(item.rateLarge),
          };
        });
        res.status(200).json(returnWashers);
      } else {
        res.status(404).json({ message: 'No available washers found.' });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err.message);
    });
});

// MIDDLEWARE TO CHECK AN ID ACTUALLY EXISTS
function checkId(req, res, next) {
  const { id } = req.params;
  Users.findById(id)
    .then((user) => {
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(404).json({
          message: `there is no user with id of ${id}`,
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

module.exports = usersRouter;
