const express = require("express");
const server = express();
const request = require("supertest");
const Jobs = require("./jobs-model");
const jobsRouter = require("./jobs-router");

jest.mock("./jobs-model");

server.use(express.json());
server.use("/", jobsRouter);

// addNewJob getAvailableJobs selectJobById addWasherToJob deleteJob editJob getJobsByUserId

// /new   /available/:id   /jobInfo/:id  /selectJob/:id  /job/:id  /job/:id /job/:id

const newJob = {
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
};

test("Posts a new Job to the /new endpoint", async () => {
  const mock = jest.spyOn(Jobs, "addNewJob");
  mock.mockImplementation(() => Promise.resolve(newJob));
  const res = await request(server).post("/new").send(newJob);
  expect(res.status).toBe(201);
  expect(res.type).toBe("application/json");
  expect(res.body).toHaveProperty("city");
  mock.mockRestore();
});

test("Fail to Post a new Job to the /new endpoint", async () => {
  const mock = jest.spyOn(Jobs, "addNewJob");
  mock.mockImplementation(() => Promise.reject(newJob));
  const res = await request(server).post("/new").send(newJob);
  expect(res.status).toBe(500);
  mock.mockRestore();
});
// come back to this later triggering catch error unsure why
test("Get available jobs from the /available/:id endpoint", async () => {
  const mock = jest.spyOn(Jobs, "getAvailableJobs");
  mock.mockImplementation(() => Promise.resolve(newJob));
  const res = await request(server).get("/available/1");
  console.log(res.body);
  expect(res.status).toBe(200);
  expect(res.body).toHaveProperty("city");
  mock.mockRestore();
});

test("Gets Job info from a job by id fromt he route /jobInfo/:id", async () => {
  const mock = jest.spyOn(Jobs, "selectJobById");
  mock.mockImplementation(() => Promise.resolve(newJob.jobId));
  const res = await request(server).get("/jobInfo/1");
  expect(res.status).toBe(200);
  mock.mockRestore();
});

//needs work unable to trigger the 403
test("Fail to Get Job info from a job by id fromt he route /jobInfo/:id", async () => {
  const mock = jest.spyOn(Jobs, "selectJobById");
  mock.mockImplementation(() => Promise.resolve());
  const res = await request(server).get("/jobInfo/1");
  expect(res.status).toBe(403);
  mock.mockRestore();
});

test("Fail to Get Job info from a job by id fromt he route /jobInfo/:id", async () => {
  const mock = jest.spyOn(Jobs, "selectJobById");
  mock.mockImplementation(() => Promise.reject(newJob.jobId));
  const res = await request(server).get("/jobInfo/1");
  expect(res.status).toBe(500);
  mock.mockRestore();
});

test("Updates the job by adding a washer to it from the /selectJob/:id end point", async () => {
  const mock = jest.spyOn(Jobs, "addWasherToJob");
  const mockFind = jest.spyOn(Jobs, "selectJobById");
  mock.mockImplementation(() => Promise.resolve(newJob.jobId, newJob.washerId));
  mockFind.mockImplementation(() => Promise.resolve(newJob.jobId));
  const res = await request(server).put("/selectJob/1").send(newJob.washerId);
  expect(res.status).toBe(200);
  mock.mockRestore();
});

test("Fails to Update the job by adding a washer to it from the /selectJob/:id end point", async () => {
  const mock = jest.spyOn(Jobs, "addWasherToJob");
  mock.mockImplementation(() => Promise.resolve());
  const res = await request(server).put("/selectJob/1").send(newJob.washerId);
  expect(res.status).toBe(500);
  expect(res.body).toMatchObject({ message: "Error setting washer on job" });
  mock.mockRestore();
});

test("Hits last catch error the job by adding a washer to it from the /selectJob/:id end point", async () => {
  const mock = jest.spyOn(Jobs, "addWasherToJob");
  const mockFind = jest.spyOn(Jobs, "selectJobById");
  mock.mockImplementation(() => Promise.reject(newJob.jobId, newJob.washerId));
  mockFind.mockImplementation(() => Promise.reject(newJob.jobId));
  const res = await request(server).put("/selectJob/1").send(newJob.washerId);
  expect(res.status).toBe(500);
  mock.mockRestore();
});

test("Deletes a job by jobId from the /job/:id endpoint", async () => {
  const mock = jest.spyOn(Jobs, "deleteJob");
  mock.mockImplementation(() => Promise.resolve(newJob.jobId));
  const res = await request(server).delete("/job/1");
  expect(res.status).toBe(204);
});

test("Fails to find id to delete a job by jobId from the /job/:id endpoint", async () => {
  const mock = jest.spyOn(Jobs, "deleteJob");
  mock.mockImplementation(() => Promise.resolve());
  const res = await request(server).delete("/job/1");
  expect(res.status).toBe(404);
});
