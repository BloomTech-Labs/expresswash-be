const carsRouter = require('express').Router();
const db = require('../database/dbConfig.js');

carsRouter.get('/makes', async (req, res) => {
    const counts = await db('cars').select('make').count().groupBy('make');
    const makes = await db('cars').distinct('make');
    const both = {...counts, makes} 
    return res.status(200).json(counts);
});

carsRouter.post('/carsByManufacturer', async (req, res) => {
    const { make } = req.body;
    const cars = await db('cars').where({make}).select('carId', 'model',);
    return res.status(200).json(cars);
});

// takes in make and model and returns car id
carsRouter.post('/getCarId', async (req, res) => {
    const { make, model } = req.body;
    const carId = await db('cars').where({make} && {model}).select('carId');
    return res.status(200).json(carId);
})

// mycars takes in userid and returns make and model and clientcarid for each (using a join statement)

//addacar takes in id and carid and color and licenseplate 
carsRouter.post('/addACar', async (req, res) => {
    const { id, carId, color, licensePlate } = req.body;
    const clientCarId = await db('clientCars').insert({ id, carId, color, licensePlate });
    const clientCar = await db('clientCars')
    // .where({clientCarId});
    return res.status(201).json(clientCar);
})


module.exports = carsRouter;