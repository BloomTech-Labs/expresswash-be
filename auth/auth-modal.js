const db = require("../database/dbConfig");

module.exports = {
  find,
  insert,
  findById,
};

function find() {
  return db("users");
}

function findById(id) {
  return db("users")
    .where({ id })
    .then(([user]) => user);
}

function insert(user) {
  return db("users")
    .insert(user, "id")
    .then(([id]) => id);
}
