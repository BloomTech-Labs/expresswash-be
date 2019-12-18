const authRouterPG = require('express').Router();

const queries = require('../database/queries.js');

authRouterPG.get('/', (req, res) => {
    queries.getAllUsers().then((users) => {
        res.json(users);
    });
});

module.exports = authRouterPG;