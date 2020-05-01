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
<<<<<<< HEAD
  return findBy(carId);
=======
  return findBy({ carId });
>>>>>>> 7c736b3bffedc6e4e2f9cfe821296c83879337a8
}

function update(changes, carId) {
  return db("cars").where({ carId }).update(changes);
}

function remove(carId) {
  return db("cars").where({ carId }).del();
}
