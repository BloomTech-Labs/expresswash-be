const carsRouterPG = require("express").Router();
const db = require("../database/dbConfig.js");
const cars = require("./cars-model");
const {
  validateCarId,
  validateCarBody,
  validateClientId,
} = require("./cars-middleware");
//get the list of all cars

carsRouterPG.get("/", (req, res) => {
  cars
    .getAll()
    .then((result) => res.status(200).json(result))
    .catch((err) => {
      res.status(500).json(err);
    });
});
// gets a car specified by carId
carsRouterPG.get("/:carId", validateCarId, async (req, res) => {
  const { carId } = req.params;

  cars
    .findBy(carId)
    .then((car) => res.status(200).json(car))
    .catch((err) => {
      res.status(500).json(err);
    });
});

//add a car to the list of cars
carsRouterPG.post("/", validateCarBody, validateClientId, (req, res) => {
  cars
    .addCar(req.body)
    .then((newCar) => res.status(201).json(newCar))
    .catch((err) => {
      res.status(500).json(err);
    });
});
// updates a car by its carId
carsRouterPG.put(
  "/:carId",
  validateCarId,
  validateCarBody,
  validateClientId,
  (req, res) => {
    const { carId } = req.params;
    const body = req.body;

    cars
      .update(body, carId)
      .then((updatedCar) =>
        res
          .status(200)
          .json({ message: "Successfully updated car", updatedCar })
      )
      .catch((err) => {
        res.status(500).json(err);
      });
  }
);

//deletes a car by carId
carsRouterPG.delete("/:carId", validateCarId, (req, res) => {
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
