const db = require("../database/dbConfig");

module.exports = {
  getAll,
  findBy,
  addCar,
};

function getAll() {
  return db("cars");
}

function findBy(filter) {
  return db("cars").where(filter).first();
}

async function addCar(car) {
  const [carId] = await db("cars").insert(car, "carId");
  return findBy({ carId });
}
