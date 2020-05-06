const cars = require("./cars-model");
const users = require("../users/users-model");

module.exports = {
  validateCarId,
  validateCarBody,
  validateClientId,
};

function validateCarId(req, res, next) {
  cars.findBy(req.params.carId).then((car) => {
    if (car) {
      req.car = car;
      next();
    } else {
      res.status(400).json({ message: `that car does not exist` });
    }
  });
}

function validateClientId(req, res, next) {
  users.findById(req.body.clientId).then((user) => {
    if (user) {
      delete user.password;
      req.user = user;
      next();
    } else {
      res.status(400).json({ error: "that user does not exist" });
    }
  });
}

function validateCarBody(req, res, next) {
  //destructuring all properties but photo from the car's body because photo is not required

  const {
    make,
    model,
    year,
    color,
    licensePlate,
    category,
    size,
    clientId,
  } = req.body;

  //turn the properties into an array so that I can check for their length to be ///able to check if there is one, many or none missing or not and making sure it //is in Object format.

  if (Object.keys(req.body).length === 0 && req.body.constructor === Object) {
    res.status(400).json({ error: "missing car body" });
  } else if (
    !make ||
    !model ||
    !year ||
    !color ||
    !licensePlate ||
    !category ||
    !size ||
    clientId !== parseInt(clientId)
  ) {
    res.status(400).json({
      error:
        "make, model, year, color, licensePlate, category, size, and clientId are required. clientId must be an integer!",
    });
    //makes sure every required property is there otherwise you will receive the error message from line 62
  } else {
    next();
  }
}
