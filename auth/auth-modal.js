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

async function insert(user) {
  const [newUser] = await db("users").insert(user, "*");
  return newUser;
}

async function insertWasher(washer) {
  const [newWasher] = await db("washers").insert(washer, "*");
  return newWasher;
}

function findWasherId(userId) {
  return db("washers")
    .where({ userId })
    .then(([washer]) => washer);
}
