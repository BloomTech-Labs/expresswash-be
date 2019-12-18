const knex = require('./knex');

module.exports = { 
    getAllUsers(){
        return knex('users');
    },

    insertUserPG(user){
        return knex('users').insert(user);
    },

    singleUserForLogin(email){
        return knex('users').where("email", email);
    },



}