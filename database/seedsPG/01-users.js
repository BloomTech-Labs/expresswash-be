// const { userSeed } = require('./users.js');

exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return knex('users').insert([
      { email: 'testClient@test.com', password:'1234', firstName: 'Test', lastName:'Client', phoneNumber:'123-456-7890', stripeUUID:'asdfghjkl01234', streetAddress:'1051 Test St', streetAddress2:'APT 2', city:'San Francisco', state:'California', zip:'94103', workStatus:'false', profilePicture:'fake1.jpg', creationDate:'Born Yesterday', accountType:'client', }, 
      { email: 'testWasher@test.com', password:'1234', firstName: 'Test', lastName:'Washer', phoneNumber:'123-456-7891', stripeUUID:'asdfghjkl01235', streetAddress:'1052 Test St', streetAddress2:'APT 3', city:'San Francisco', state:'California', zip:'94103', workStatus:'true', profilePicture:'fake2.jpg', creationDate:'Born Yesterday', accountType:'washer', }, 
      ]);
    });
};
