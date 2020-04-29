const db = require("../database/dbConfig");

module.exports = {
  del,
  find,
  findById,
  update,
};

function find() {
  return db("users").select("*");
}

function findById(id) {
  return db("users").where({ id }).first();
}

function del(id) {
  return db("users").where({ id }).del();
}

function update(id, changes) {
  return db("users").where({ id }).update(changes, "*");
}
