const db = require("../database/dbConfig");

module.exports = {
  del,
  find,
  findById,
  update,
  updateWasher,
  findByWasherId,
  getUserCars,
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
function findByWasherId(washerId) {
  return db("washers").where({ washerId }).first();
}
function updateWasher(washerId, changes) {
  return db("washers").where({ washerId }).update(changes, "*");
}

function getUserCars(id) {
  return db("cars").where({ clientId: id });
}
