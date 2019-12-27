
exports.seed = function(knex, Promise) {
  return knex('jobs').del()
    .then(function () {
      return knex('jobs').insert([
      { washAddress:'testAddress', clientId:'1', clientCarId:'1', washerId:'2', }, 
      { washAddress:'testAddress2', clientId:'1', clientCarId:'2', washerId:'2', }, 
      ]);
    });
};
