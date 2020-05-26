const mockDb = require("mock-knex");
const knex = require("knex")({ client: "pg" });
const model = require("../auth/auth-modal");
mockDb.mock(knex);

test("testing auth model find", async () => {
  const res = await model.find();
  expect(res).toHaveLength(1);
});
test("testing auth model findWahser", async () => {
  const res = await model.findWasher();
  expect(res).toHaveLength(1);
});
test("testing auth model findById", async () => {
  const res = await model.findById(1);
  expect(res).toMatchObject({ id: 1, name: "chris", email: "chris@aol.com" });
});
test("testing auth model findByEmail", async () => {
  const res = await model.findByEmail("chris@aol.com");
  expect(res).toHaveProperty("email");
});
test("testing auth model insert", async () => {
  const res = await model.insert({});
  expect(res).toHaveProperty("id");
});
test("testing auth model insertWasher", async () => {
  const res = await model.insertWasher({});
  expect(res).toHaveProperty("name");
});
test("testing auth model findWasherId", async () => {
  const res = await model.findWasherId(1);
  expect(res).toHaveProperty("name");
});
// tracker for incoming sql queries and sets response
const tracker = require("mock-knex").getTracker();
tracker.install();
tracker.on("query", (query) => {
  query.response([
    {
      id: 1,
      name: "chris",
      email: "chris@aol.com",
    },
  ]);
});
