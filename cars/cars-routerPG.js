const carsRouterPG = require("express").Router();
const db = require("../database/dbConfig.js");
const queries = require("../database/queries.js");
const cars = require("./cars-model");

//get the list of all cars

carsRouterPG.get("/", (req, res) => {
  cars
    .getAll()
    .then((result) => res.status(200).json(result))
    .catch((err) => {
      res.status(500).json(err);
    });
});
//gets a car specified by carId
carsRouterPG.get("/:carId", (req, res) => {
  const { carId } = req.params;
  cars
    .findBy(carId)
    .then((car) => {
      if (car) {
        res.status(200).json(car);
      } else {
        res
          .status(404)
          .json({ message: `there is no car with carId of ${carId}` });
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

//adds a car to the list of cars
carsRouterPG.post("/", (req, res) => {
  cars
    .addCar(req.body)
    .then((newCar) => res.status(201).json(newCar))
    .catch((err) => {
      res.status(500).json(err);
    });
});
// updates a car by carId
carsRouterPG.put("/:carId", (req, res) => {
  const { carId } = req.params;
  const body = req.body;

  cars
    .update(body, carId)
    .then((updatedCar) => res.status(200).json(updatedCar))
    .catch((err) => {
      res.status(500).json(err);
    });
});

// deletes a car by carId
carsRouterPG.delete("/:carId", (req, res) => {
  const { carId } = req.params;

  cars
    .remove(carId)
    .then((deletedCar) =>
      res
        .status(200)
        .json({ message: `Successfully deleted ${deletedCar} car` })
    )
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = carsRouterPG;
