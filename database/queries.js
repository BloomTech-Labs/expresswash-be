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

    getLatestReviewOfWasher(id){
        return knex('ratingsOW').first().where({ id })
    },

    getLatestReviewOfClient(id){
        return knex('ratingsOC').first().where({ id })
    },

    getLatestJobClient(clientId){
        return knex('jobs').first().where({ clientId })
    },

    addNewJob(newJob){
        return knex('jobs').insert(newJob)
    },

    seeAvailableJobs(){
        return knex('jobs')
    }


}