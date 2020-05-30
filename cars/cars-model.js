const db = require("../database/dbConfig");

module.exports = {
  getAll,
  findBy,
  addCar,
  update,
  remove,
};

function getAll() {
  return db("cars");
}

function findBy(carId) {
  return db("cars").where({ carId }).first();
}

async function addCar(car) {
  const [carId] = await db("cars").insert(car, "carId");
  return findBy(carId);
}

function update(changes, carId) {
  return db("cars")
    .where({ carId })
    .update(changes, "*")
    .then(([car]) => car);
}

function remove(carId) {
  return db("cars").where({ carId }).del();
}
