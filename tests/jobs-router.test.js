const express = require("express");
const server = express();
const request = require("supertest");
const Jobs = require("../jobs/jobs-model");
const jobsRouter = require("../jobs/jobs-router");

jest.mock("../jobs/jobs-model");

server.use(express.json());
server.use("/", jobsRouter);

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

test("/new, POST new Job: success", async () => {
  const mock = jest.spyOn(Jobs, "addNewJob");
  mock.mockImplementation(() => Promise.resolve(newJob));
  const res = await request(server).post("/new").send(newJob);
  expect(res.status).toBe(201);
  expect(res.type).toBe("application/json");
  expect(res.body).toHaveProperty("city");
  mock.mockRestore();
});

test("/new, POST new Job: error(catch)", async () => {
  const mock = jest.spyOn(Jobs, "addNewJob");
  mock.mockImplementation(() => Promise.reject(newJob));
  const res = await request(server).post("/new").send(newJob);
  expect(res.status).toBe(500);
  mock.mockRestore();
});

test("/jobInfo/:id, GET Job info by job id: success", async () => {
  const mock = jest.spyOn(Jobs, "selectJobById");
  const mockValidate = jest.spyOn(Jobs, "selectJobById");
  mockValidate.mockImplementationOnce(() => Promise.resolve(true));
  mock.mockImplementation(() => Promise.resolve(newJob.jobId));
  const res = await request(server).get("/jobInfo/1");
  expect(res.status).toBe(200);
  mock.mockRestore();
  mockValidate.mockRestore();
});

test("/jobInfo/:id, GET Job info by job id: error(not found)", async () => {
  const mock = jest.spyOn(Jobs, "selectJobById");
  const mockValidate = jest.spyOn(Jobs, "selectJobById");
  mockValidate.mockImplementationOnce(() => Promise.resolve(false));
  mock.mockImplementation(() => Promise.resolve());
  const res = await request(server).get("/jobInfo/1");
  expect(res.status).toBe(400);
  mock.mockRestore();
  mockValidate.mockRestore();
});

test("/jobInfo/:id, GET Job info by job id: error(catch)", async () => {
  const mock = jest.spyOn(Jobs, "selectJobById");
  const mockValidate = jest.spyOn(Jobs, "selectJobById");
  mockValidate.mockImplementationOnce(() => Promise.resolve(true));
  mock.mockImplementation(() => Promise.reject(newJob.jobId));
  const res = await request(server).get("/jobInfo/1");
  expect(res.status).toBe(500);
  mock.mockRestore();
  mockValidate.mockRestore();
});

test("/selectJob/:id, PUT Washer to Job by job id: success", async () => {
  const mock = jest.spyOn(Jobs, "addWasherToJob");
  const mockFind = jest.spyOn(Jobs, "selectJobById");
  const mockValidate = jest.spyOn(Jobs, "selectJobById");
  mockValidate.mockImplementationOnce(() => Promise.resolve(true));
  mock.mockImplementation(() => Promise.resolve(newJob.jobId, newJob.washerId));
  mockFind.mockImplementation(() => Promise.resolve(newJob.jobId));
  const res = await request(server).put("/selectJob/1").send(newJob.washerId);
  expect(res.status).toBe(203);
  mock.mockRestore();
  mockFind.mockRestore();
  mockValidate.mockRestore();
});

test("/selectJob/:id, PUT Washer to Job by job id: error(not found)", async () => {
  const mock = jest.spyOn(Jobs, "addWasherToJob");
  const mockValidate = jest.spyOn(Jobs, "selectJobById");
  mockValidate.mockImplementationOnce(() => Promise.resolve(false));
  mock.mockImplementation(() => Promise.resolve());
  const res = await request(server).put("/selectJob/1").send(newJob.washerId);
  expect(res.status).toBe(400);
  expect(res.body).toMatchObject({ message: "invalid job id" });
  mock.mockRestore();
  mockValidate.mockRestore();
});

test("/selectJob/:id, PUT Washer to Job by job id: error(catch)", async () => {
  const mock = jest.spyOn(Jobs, "addWasherToJob");
  const mockFind = jest.spyOn(Jobs, "selectJobById");
  const mockValidate = jest.spyOn(Jobs, "selectJobById");
  mockValidate.mockImplementationOnce(() => Promise.resolve(true));
  mock.mockImplementation(() => Promise.reject(newJob.jobId, newJob.washerId));
  mockFind.mockImplementation(() => Promise.reject(newJob.jobId));
  const res = await request(server).put("/selectJob/1").send(newJob.washerId);
  expect(res.status).toBe(500);
  mock.mockRestore();
  mockFind.mockRestore();
  mockValidate.mockRestore();
});

test("/job/:id, DELETE Job by job id: success", async () => {
  const mock = jest.spyOn(Jobs, "deleteJob");
  const mockValidate = jest.spyOn(Jobs, "selectJobById");
  mockValidate.mockImplementationOnce(() => Promise.resolve(true));
  mock.mockImplementation(() => Promise.resolve(newJob.jobId));
  const res = await request(server).delete("/job/1");
  expect(res.status).toBe(204);
  mock.mockRestore();
  mockValidate.mockRestore();
});

test("/job/:id, DELETE Job by job id: error(not found)", async () => {
  const mock = jest.spyOn(Jobs, "deleteJob");
  const mockValidate = jest.spyOn(Jobs, "selectJobById");
  mockValidate.mockImplementationOnce(() => Promise.resolve(false));
  mock.mockImplementation(() => Promise.resolve());
  const res = await request(server).delete("/job/1");
  expect(res.status).toBe(400);
  mock.mockRestore();
  mockValidate.mockRestore();
});

test("/job/:id, DELETE Job by job id: error(catch)", async () => {
  const mock = jest.spyOn(Jobs, "deleteJob");
  const mockValidate = jest.spyOn(Jobs, "selectJobById");
  mockValidate.mockImplementationOnce(() => Promise.resolve(true));
  mock.mockImplementation(() => Promise.reject(newJob.jobId));
  const res = await request(server).delete("/job/1");
  expect(res.status).toBe(500);
  mock.mockRestore();
  mockValidate.mockRestore();
});

test("/job/:id, PUT Job changes by job id: success", async () => {
  const mock = jest.spyOn(Jobs, "editJob");
  const mockValidate = jest.spyOn(Jobs, "selectJobById");
  mockValidate.mockImplementationOnce(() => Promise.resolve(true));
  mock.mockImplementation(() => Promise.resolve(2));
  const res = await request(server).put("/job/1").send(newJob);
  expect(res.status).toBe(200);
  mock.mockRestore();
  mockValidate.mockRestore();
});

test("/job/:id, PUT Job changes by job id: error(not found)", async () => {
  const mock = jest.spyOn(Jobs, "editJob");
  const mockValidate = jest.spyOn(Jobs, "selectJobById");
  mockValidate.mockImplementationOnce(() => Promise.resolve(false));
  mock.mockImplementation(() => Promise.resolve());
  const res = await request(server).put("/job/1").send(newJob);
  expect(res.status).toBe(400);
  expect(res.body).toMatchObject({
    message: "invalid job id",
  });
  mock.mockRestore();
  mockValidate.mockRestore();
});

test("/job/:id, PUT Job changes by job id: error(catch)", async () => {
  const mock = jest.spyOn(Jobs, "editJob");
  const mockValidate = jest.spyOn(Jobs, "selectJobById");
  mockValidate.mockImplementationOnce(() => Promise.resolve(true));
  mock.mockImplementation(() => Promise.reject(2));
  const res = await request(server).put("/job/1").send(newJob);
  expect(res.status).toBe(500);
  mock.mockRestore();
  mockValidate.mockRestore();
});

test("/user/:id, GET Jobs by user id: success", async () => {
  const mock = jest.spyOn(Jobs, "getJobsByUserId");
  mock.mockImplementation(() => Promise.resolve(newJob));
  const res = await request(server).get("/user/1");
  expect(res.status).toBe(200);
  mock.mockRestore();
});

test("/user/:id, GET Jobs by user id: error(not found)", async () => {
  const mock = jest.spyOn(Jobs, "getJobsByUserId");
  mock.mockImplementation(() => Promise.resolve());
  const res = await request(server).get("/user/1");
  expect(res.status).toBe(400);
  expect(res.body).toMatchObject({
    message: "Jobs for the specified ID does not exist.",
  });
  mock.mockRestore();
});

test("/user/:id, GET Jobs by user id: error(catch)", async () => {
  const mock = jest.spyOn(Jobs, "getJobsByUserId");
  mock.mockImplementation(() => Promise.reject(newJob));
  const res = await request(server).get("/user/1");
  expect(res.status).toBe(500);
  mock.mockRestore();
});

test("/jobs, GET ALL Jobs", async () => {
  const mock = jest.spyOn(Jobs, "find");
  mock.mockImplementation(() => Promise.resolve([]));
  const res = await request(server).get("/");
  expect(res.status).toBe(200);
  mock.mockRestore();
});

test("/jobs, GET ALL Jobs Error", async () => {
  const mock = jest.spyOn(Jobs, "find");
  mock.mockImplementation(() => Promise.reject({ message: "broken" }));
  const res = await request(server).get("/");
  expect(res.status).toBe(500);
  mock.mockRestore();
});
