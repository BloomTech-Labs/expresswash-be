const mockDB = require("mock-knex");
const knex = require("knex")({ client: "pg" });
const model = require("./cars-model");
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

  expect(res).toMatchObject(expectedObject);
});

// test("testing cars model findBy", async () =>{
//      const
// })

// tracker for incoming sql queries and sets response
const tracker = require("mock-knex").getTracker();
tracker.install();
tracker.on("query", (query) => {
  query.response({
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
  });
});
