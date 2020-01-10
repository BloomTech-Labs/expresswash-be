const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();

// routers=require('') go here

const authRouter = require('../auth/auth-router.js');
const carsRouter = require('../cars/cars-router.js');
const authRouterPG = require('../auth/auth-routerPG.js');
const carsRouterPG = require('../cars/cars-routerPG.js');
const jobsRouter = require('../jobs/jobs-router.js');
const usersRouter = require('../users/users-router.js');
const ratingsRouter = require('../ratings/ratings-router.js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/auth/', authRouter);
server.use('/cars/', carsRouter);
server.use('/authPG/', authRouterPG);
server.use('/carsPG/', carsRouterPG);
server.use('/jobs/', jobsRouter);
server.use('/users/', usersRouter);
server.use('/ratings/', ratingsRouter);

server.get('/', (req, res) => {
    res.status(200).json({message: 'Backend is up and running'});
});

// catch 404 and forward to the error handler
server.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler 
server.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({ 
        message: err.message,
        error: req.server.get('env') === 'development' ? err : {}
    });
});

module.exports = server;
