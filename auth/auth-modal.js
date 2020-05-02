const db = require("../database/dbConfig");

module.exports = {
  find,
  insert,
  findById,
  findByEmail,
  insertWasher,
  findWasherId,
  findWasher,
};
function findWasher() {
  return db("washers");
}

function find() {
  return db("users");
}

function findById(id) {
  return db("users").where({ id }).first();
}

function findByEmail(email) {
  return db("users").where({ email }).first();
}

function insert(user) {
  return db("users").insert(user, "*");
}

function insertWasher(washer) {
  return db("washers").insert(washer, "*");
}

function findWasherId(userId) {
  return db("washers")
    .where({ userId })
    .then(([washer]) => washer);
}
