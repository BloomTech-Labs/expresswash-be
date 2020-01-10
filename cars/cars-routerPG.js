const carsRouterPG = require('express').Router();
const db = require('../database/dbConfig.js');
const queries = require('../database/queries.js');
const { getCarMakes, getCarModelsForMake, myCars } = require('../database/queries.js')


// returns array of car makes
carsRouterPG.get('/makes', async (req, res) => {
    // const counts = await db('cars').select('make').count().groupBy('make');
    // const makes = await db('cars').distinct('make');
    // const both = {...counts, makes} 
    // return res.status(200).json(counts);
    return getCarMakes()
    .then(counts => {
        return res.status(200).json(counts)
    })
    .catch(err => res.status(500).json(error))
});

//returns array of car models for a car make
carsRouterPG.post('/models', async (req, res) => {
    const { make } = req.body;
    return getCarModelsForMake(make)
    .then(models => {
        return res.status(200).json(models);
    })
    .catch(err => res.status(500).json(error));
});

// takes in make and model and returns car id
carsRouterPG.post('/getCarId', async (req, res) => {
    const { make, model } = req.body;
    const carId = await db('cars').where({make} && {model}).select('carId');
    return res.status(200).json(carId);
})

// mycars takes in userid and returns make and model and clientcarid for each (using a join statement)
carsRouterPG.post('/myCars', async (req, res) => {
    const { id } = req.body
    return myCars(id)
    .then(allMyCars => { 
        return res.status(200).json(allMyCars)
    })
    .catch(err => res.status(500).json(err));
})

//addacar takes in id and carid and color and licenseplate 
carsRouterPG.post('/addACar', async (req, res) => {
    const { id, carId, color, licensePlate } = req.body;
    const clientCarId = await db('clientCars').insert({ id, carId, color, licensePlate });
    const clientCar = await db('clientCars')
    // .where({clientCarId});
    return res.status(201).json(clientCar);
})


module.exports = carsRouterPG;