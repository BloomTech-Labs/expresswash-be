const db = require('../database/knex');

module.exports = {
  find,
  findById,
  update
};

function find() {
  return db("users").select("*");
}

function findById(id) {
  return db("users")
    .select("firstName", "lastName", "email", "phoneNumber")
    .where({ id })
    .first();
}

function update(id, changes) {
  return db("users")
    .where({ id })
    .update(changes, "*");
}
