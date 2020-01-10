const ratingsRouter = require('express').Router();
const queries = require('../database/queries.js');
const { getWasherRatings, getClientRatings, rateWasher, rateClient } = require('../database/queries.js')

// returns average rating for a washer
ratingsRouter.post('/washerAverage', async (req, res) => {
    const { id } = req.body;
    return getWasherRatings(id)
    .then(result => {
        // console.log(result)
        const ratingsArray = [];
        result.forEach(rating => {
            ratingsArray.push(rating.rating)
        })
        // console.log('2', ratingsArray)

        let total = 0;
        for(var i = 0; i < ratingsArray.length; i++) {
        total += ratingsArray[i];
        }
        let avg = total / ratingsArray.length;

        res.status(200).json(avg)
    })
    .catch(err => res.status(500).json(err))
});

// returns average rating for a client
ratingsRouter.post('/clientAverage', async (req, res) => {
    const { id } = req.body;
    return getClientRatings(id)
    .then(result => {
        // console.log(result)
        const ratingsArray = [];
        result.forEach(rating => {
            ratingsArray.push(rating.rating)
        })
        // console.log('2', ratingsArray)

        let total = 0;
        for(var i = 0; i < ratingsArray.length; i++) {
        total += ratingsArray[i];
        }
        let avg = total / ratingsArray.length;

        res.status(200).json(avg)
    })
    .catch(err => res.status(500).json(err))
});

// add a washer rating
ratingsRouter.post('/rateWasher', async (req, res) => {
    const { id, rating, notes } = req.body;
    const washerRating = { id, rating, notes };
    // console.log(washerRating);
    return rateWasher(washerRating)
    .then((result) => {
        // console.log(result);
        res.status(200).json({message:`successfully rated washerId: ${id}`})
    })
    .catch(err => res.status(500).json(err))
});

// add a client rating
ratingsRouter.post('/rateClient', async (req, res) => {
    const { id, rating, notes } = req.body;
    const clientRating = { id, rating, notes };
    return rateClient(clientRating)
    .then(result => {
        // console.log(res)
        res.status(200).json({message:`successfully rated clientId: ${id}`})
    })
    .catch(err => res.status(500).json(err))
});

module.exports = ratingsRouter;