const mockDB = require("mock-knex");
const knex = require("knex")({ client: "pg" });
const model = require("../cars/cars-model");
mockDB.mock(knex);

const expectedObject = {
  carId: 1,
  clientId: 1,
  make: "gefdf",
  model: "morneo",
  year: 2005,
  color: "Gold",
  licensePlate: "Nissanfeva",
  photo: "",
  category: "SUV",
  size: "M",
};

test("testing cars model getAll", async () => {
  const res = await model.getAll();
  let resObject = {};
  for (let keys of res) {
    resObject = keys;
  }

  expect(resObject).toMatchObject(expectedObject);
});

test("testing cars model findBy", async () => {
  const res = await model.findBy(1);
  expect(res).toHaveProperty("make");
});

test("testing card model addCar", async () => {
  const res = await model.addCar({});
  expect(res).toHaveProperty("year", 2005);
});

test("testing cars model update", async () => {
  const res = await model.update({ color: "Golden" }, 1);
  expect(res).toHaveProperty("carId");
});
test("testing cars model delete", async () => {
  const res = await model.remove(1);
  expect(res).toHaveLength(1);
});

// tracker for incoming sql queries and sets response
const tracker = require("mock-knex").getTracker();
tracker.install();
tracker.on("query", (query) => {
  query.response([
    {
      carId: 1,
      clientId: 1,
      make: "gefdf",
      model: "morneo",
      year: 2005,
      color: "Gold",
      licensePlate: "Nissanfeva",
      photo: "",
      category: "SUV",
      size: "M",
    },
  ]);
});
