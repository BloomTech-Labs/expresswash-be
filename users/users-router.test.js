const express = require("express");
const server = express();
const request = require("supertest");
const bcrypt = require("bcryptjs");
const Users = require("./users-model");
const usersRouter = require("./users-router");

server.use(express.json());
server.use("/", usersRouter);

test("/users/ GET request - return all users in users table status 200", async () => {
  const mock = jest.spyOn(Users, "find");
  mock.mockImplementationOnce(() => Promise.resolve());
  const res = await request(server).get("/");
  expect(res.status).toBe(200);
  mock.mockRestore();
});

test("/users/ GET request - return error and status 500 on failure", async () => {
  const mock = jest.spyOn(Users, "find");
  mock.mockImplementationOnce(() => Promise.reject());
  const res = await request(server).get("/");
  expect(res.status).toBe(500);
  mock.mockRestore();
});
