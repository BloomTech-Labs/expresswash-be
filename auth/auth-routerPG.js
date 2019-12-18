const authRouterPG = require('express').Router();
const bcrypt = require('bcryptjs');
const generateToken = require('../middleware/generateToken.js')

const queries = require('../database/queries.js');

authRouterPG.get('/', (req, res) => {
    queries.getAllUsers().then((users) => {
        res.json(users);
    });
});

// authRouterPG.post('/registerClient', async (req, res) => {

// });

module.exports = authRouterPG;