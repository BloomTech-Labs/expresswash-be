const express = require("express");
const server = express();
const request = require("supertest");
const bcrypt = require("bcryptjs");
const Users = require("./auth-modal");
const authRouter = require("./auth-routerPG");
const middle = require("./auth-middleware");
server.use(express.json());
server.use("/", authRouter);

const findData = [
  {
    id: 1,
    accountType: "washer",
    email: "testing123@aol.com222",
    password: "$2a$10$8vtHHAn2Sfjqz7SBhQTZlukqmQW00GtAQ1uGWVxTyfJZecsPvA3HS",
    firstName: "chris",
    lastName: "adams",
    phoneNumber: "8675309",
    stripeUUID: "sdasa8678",
    streetAddress: "1234 cherry ln.",
    streetAddress2: "apt 69",
    city: "cabo san lucas",
    state: "somewhere",
    zip: "23456",
    workStatus: true,
    profilePicture: "dsakdjsal",
    bannerImage: "dfjhkslajhdfkljas",
    creationDate: "2020-04-24T14:23:56.864-04:00",
    userRating: 3,
  },
];
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
const loginUser = {
  email: "chris@aol.com",
  password: bcrypt.hashSync("taco", 10),
  accountType: "washer",
};

test("Gets all users from the /auth endpoint", async () => {
  const mock = jest.spyOn(Users, "find");
  mock.mockImplementationOnce(() => Promise.resolve(findData));
  const res = await request(server).get("/");
  expect(res.body).toHaveLength(1);
  expect(res.status).toBe(200);
  expect(res.body[0]).toHaveProperty("id");
  expect(res.body[0].firstName).toBe("chris");
  expect(res.type).toBe("application/json");
  mock.mockRestore();
});

test("Posts a new User to the /auth/registerClient endpoint", async () => {
  const mock = jest.spyOn(Users, "insert");
  const mockFind = jest.spyOn(Users, "findById");
  mock.mockImplementationOnce(() => Promise.resolve(1));
  mockFind.mockImplementationOnce(() => Promise.resolve(newUser));
  const res = await request(server).post("/registerClient").send(newUser);
  expect(res.status).toBe(201);
  expect(res.type).toBe("application/json");
  expect(res.body).toHaveProperty("token");
  expect(res.body).toHaveProperty("user");
  expect(res.body).toMatchObject({ message: "user created successfully" });
  mock.mockRestore();
  mockFind.mockRestore();
});

test("Posts a new Washer to the /auth/registerWasher/:id endpoint", async () => {
  const mock = jest.spyOn(Users, "insertWasher");
  const mockFind = jest.spyOn(Users, "findWasherId");
  const mockFindUser = jest.spyOn(Users, "findById");
  const mockIfWasherExists = jest.spyOn(Users, "findWasherId");
  mockFindUser.mockImplementationOnce(() => Promise.resolve(newUser));
  mockIfWasherExists.mockImplementationOnce(() => Promise.resolve(false));
  mock.mockImplementationOnce(() => Promise.resolve(1));
  mockFind.mockImplementationOnce(() => Promise.resolve(newWasher));
  const res = await request(server).post("/registerWasher/1").send(newWasher);
  expect(res.status).toBe(201);
  expect(res.body).toHaveProperty("user");
  expect(res.body).toHaveProperty("washer");
  mock.mockRestore();
  mockFind.mockRestore();
  mockFindUser.mockRestore();
  mockIfWasherExists.mockRestore();
});

test("Get list of washers", async () => {
  const mock = jest.spyOn(Users, "findWasher");
  mock.mockImplementationOnce(() => Promise.resolve([newWasher]));
  const res = await request(server).get("/washers");
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
  expect(res.type).toBe("application/json");
});

test("Log user in to the /auth/login endpoint", async () => {
  const mock = jest.spyOn(Users, "findByEmail");
  const mockFindWasher = jest.spyOn(Users, "findWasherId");
  mock.mockImplementationOnce(() => Promise.resolve(loginUser));
  mockFindWasher.mockImplementationOnce(() => Promise.resolve(newWasher));
  const res = await request(server)
    .post("/login")
    .send({ email: "someEmail", password: "taco" });
  expect(res.status).toBe(200);
  expect(res.body).toHaveProperty("token");
  expect(res.body).toHaveProperty("user");
  expect(res.body).toHaveProperty("washer");
  mock.mockRestore();
  mockFindWasher.mockRestore();
});
