
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', (table) => {
      table.increments('id');
      table.text('accountType');
      table.text('email');
      table.text('password');
      table.text('firstName');
      table.text('lastName');
      table.text('phoneNumber');
      table.text('stripeUUID');
      table.text('streetAddress');
      table.text('streetAddress2');
      table.text('city');
      table.text('state');
      table.text('zip');
      table.text('workStatus');
      table.text('profilePicture');
      table.text('creationDate');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
