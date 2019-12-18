const knex = require('./knex');

module.exports = { 
    getAllUsers(){
        return knex('users');
    }
    



}