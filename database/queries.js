const knex = require('./knex');

module.exports = { 
    getAllUsers(){
        return knex('users');
    },

    getNewUser(){
        return knex('users')
    },

    insertUserPG(user){
        return knex('users').insert(user);
    },

    singleUserForLogin(email){
        return knex('users').where("email", email);
    },

    getCarMakes(){
        return knex('cars').select('make').count().groupBy('make').orderBy('make', 'asc');
    },

    getCarModelsForMake(make){
        return knex('cars').where({make}).select('carId', 'model',);
    },

    myCars(id){ 
        return knex('clientCars').where({ id }).select('carId', 'color', 'licensePlate',);
    },

    addACar(clientCar){
        return knex('clientCars').insert(clientCar)
    },


}