const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

// routers=require('') go here
const authRouter = require('../auth/auth-router.js')

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/auth/', authRouter);

server.get('/', (req, res) => {
    res.status(200).json({message: 'Backend is up and running'});
})

module.exports = server;