const carsRouter = require('express').Router();
const db = require('../database/dbConfig.js');

carsRouter.get('/makes', async (req, res) => {
    const makes = await db('cars').distinct('make');
    return res.status(200).json(makes);
});

carsRouter.post('/carsByManufacturer', async (req, res) => {
    const { make } = req.body;
    const cars = await db('cars').where({make}).select('model');
    return res.status(200).json(cars);
})


module.exports = carsRouter;