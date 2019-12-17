const db = require("../database/dbConfig.js");

module.exports = {
  find,
  findById,
  update
};

function find() {
  return db("Users").select("*");
}

function findById(id) {
  return db("Users")
    .select("firstName", "lastName", "email", "phoneNumber")
    .where({ id })
    .first();
}

function update(id, changes) {
  return db("Users")
    .where({ id })
    .update(changes, "*");
}
