
exports.seed = function(knex, Promise) {
  return knex('ratingsOW').del()
    .then(function () {
      return knex('ratingsOW').insert([
      { rating:'5', notes:'great wash and fast', id:'2',  }, 
      { rating:'4', notes:'great quick wash', id:'2',  }, 
      ]);
    });
};
