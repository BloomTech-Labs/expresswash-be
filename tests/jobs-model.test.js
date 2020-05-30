const mockDb = require("mock-knex");
const knex = require("knex")({ client: "pg" });
const model = require("../jobs/jobs-model");
mockDb.mock(knex);

test("testing jobs model addNewJob", async () => {
  const res = await model.addNewJob({});
  expect(res).toHaveProperty("washAddress");
});

test("testing jobs model getAvailableJobs", async () => {
  const res = await model.getAvailableJobs(1);
  expect(res).toHaveProperty("jobId");
});

test("testing jobs model selectJobById", async () => {
  const res = await model.selectJobById(1);
  expect(res).toHaveProperty("scheduled");
});

test("testing jobs model addWasherToJob", async () => {
  const washerID = { washerID: 1 };
  const res = await model.addWasherToJob(1, washerID);
  expect(res).toHaveProperty("washerId");
});

test("testing jobs model deleteJob", async () => {
  const res = await model.deleteJob(1);
});

test("testing jobs model editJob", async () => {
  const changes = { paid: true };
  const res = await model.editJob(1, changes);
  expect(res).toHaveProperty("paid");
});

test("testing jobs model getJobsByUserId", async () => {
  const res = await model.getJobsByUserId(1);
  expect(res).toHaveProperty("clientId");
});

test("testing jobs model find", async () => {
  const res = await model.find();
  expect(res).toHaveProperty("zip");
});

const tracker = require("mock-knex").getTracker();
tracker.install();
tracker.on("query", (query) => {
  query.response({
    jobId: 1,
    washAddress: "42 Wallaby Way, Sydney",
    scheduled: true,
    completed: false,
    paid: false,
    clientId: 1,
    washerId: null,
    creationDate: "4/28/2020",
    carId: 1,
    address: "42 Wallaby Way, Sydney",
    city: "Sydney",
    state: "AUS",
    zip: "911",
    jobType: "Detail",
    timeRequested: "12:00",
  });
});
