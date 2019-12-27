
exports.seed = function(knex, Promise) {
  return knex('clientCars').del()
    .then(function () {
      return knex('clientCars').insert([
      { carId:'1', id:'1', color:'blue', licensePlate:'TST0001' }, 
      { carId:'47', id:'1', color:'white', licensePlate:'TST0002' }, 
      ]);
    });
};
