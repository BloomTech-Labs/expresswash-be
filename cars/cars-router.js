const carsRouter = require('express').Router();
const db = require('../database/dbConfig.js');

carsRouter.get('/makes', async (req, res) => {
    const makes = await db('cars').distinct('make');
    return res.status(200).json(makes);
  });



module.exports = carsRouter;