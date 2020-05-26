const express = require("express");
const server = express();
const request = require("supertest");
const Users = require("../auth/auth-modal");
const authRouter = require("../auth/auth-routerPG");
server.use(express.json());
server.use("/", authRouter);

const newWasher = {
  rateSmall: 30,
  rateMedium: 50,
  rateLarge: 75,
  aboutMe: "I am a washer",
  currentLocation: "lat:27, lon:55",
  available: true,
  washerRating: 3,
};
const newUser = {
  email: "someemail",
  firstName: "chris",
  lastName: "adams",
  password: "taco",
};

test("Test error handling for validateUserId middleware", async () => {
  const mock = jest.spyOn(Users, "findById");
  mock.mockImplementationOnce(() => Promise.resolve(false));
  const res = await request(server).post("/registerWasher/1").send(newWasher);
  expect(res.status).toBe(400);
  expect(res.body).toMatchObject({ message: "invalid user id" });
  mock.mockRestore();
});

test("Test error handling for ifWasherExists middleware", async () => {
  const mock = jest.spyOn(Users, "findById");
  const mockIfWasherExists = jest.spyOn(Users, "findWasherId");
  mock.mockImplementationOnce(() => Promise.resolve(newUser));
  mockIfWasherExists.mockImplementationOnce(() => Promise.resolve(true));
  const res = await request(server).post("/registerWasher/1").send(newWasher);
  expect(res.status).toBe(400);
  expect(res.body).toMatchObject({
    message: "user already registered as a washer",
  });
  mock.mockRestore();
  mockIfWasherExists.mockRestore();
});
