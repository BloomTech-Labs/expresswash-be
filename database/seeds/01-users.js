
exports.seed = function(knex) {
  return knex('users').insert([
    { email: 'testClient@test.com', password:'pass', firstName: 'Test', lastName:'Client', phoneNumber:'123-456-7890', streetAddress:'1051 Test St', streetAddress2:'APT 2', city:'San Francisco', state:'California', zip:'94103', accountType:'client', }, 
    { email: 'testWasher@test.com', password:'pass', firstName: 'Test', lastName:'Washer', phoneNumber:'123-456-7891', streetAddress:'1052 Test St', streetAddress2:'APT 3', city:'San Francisco', state:'California', zip:'94103', accountType:'washer', }, 
    { email: 'admin', password:'administrator', firstName:'admin', lastName:'admin', phoneNumber:'123-456-7891', streetAddress:'123 Fake Ave', streetAddress2:'APT Fake', city:'San Francisco', state:'California', zip:'94103', accountType:'admin'},
  ]);
};
