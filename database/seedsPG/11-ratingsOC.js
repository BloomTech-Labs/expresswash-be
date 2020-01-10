
exports.seed = function(knex, Promise) {
  return knex('ratingsOC').del()
    .then(function () {
      return knex('ratingsOC').insert([
      { rating:'2', notes:'didnt point me to correct location of the car and didnt tip', id:'1' }, 
      { rating:'5', notes:'car was already pretty clean and it was easy', id:'1' }, 
      ]);
    });
};
