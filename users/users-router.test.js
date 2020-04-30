const express = require("express");
const server = express();
const request = require("supertest");
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

test("/users/:id GET request - return user by id with response status 200", async () => {
  const mock = jest.spyOn(Users, "findById");
  mock.mockImplementationOnce(() => Promise.resolve(2));
  const res = await request(server).get("/2");
  expect(res.status).toBe(200);
  mock.mockRestore();
});

test("/users/:id GET request - return response status 404 when no user", async () => {
  const mock = jest.spyOn(Users, "findById");
  mock.mockImplementationOnce(() => Promise.resolve());
  const res = await request(server).get("/1");
  expect(res.status).toBe(404);
  mock.mockRestore();
});

test("/users/:id DELETE request - return response status 200 when deleting a valid user", async () => {
  const mock = jest.spyOn(Users, "findById");
  mock.mockImplementationOnce(() => Promise.resolve(1));
  const res = await request(server).delete("/1");
  expect(res.status).toBe(200);
  mock.mockRestore();
});

test("/users/:id DELETE request - return response status 404 when no user", async () => {
  const mock = jest.spyOn(Users, "del");
  mock.mockImplementationOnce(() => Promise.resolve());
  const res = await request(server).delete("/2");
  expect(res.status).toBe(404);
  mock.mockRestore();
});

test("/users/:id DELETE request - return response status 500 when server error occurs", async () => {
  const mock = jest.spyOn(Users, "findById");
  mock.mockImplementationOnce(() => Promise.reject(1));
  const res = await request(server).delete("/1");
  expect(res.status).toBe(500);
  mock.mockRestore();
});

changes = { firstName: "new", lastName: "old" };

test("/users/:id PUT request - return response status 200 when user successfully updated", async () => {
  const mock = jest.spyOn(Users, "findById");
  const mockUpdate = jest.spyOn(Users, "update");
  mock.mockImplementationOnce(() => Promise.resolve(1));
  mockUpdate.mockImplementationOnce(() => Promise.resolve(changes));
  const res = await request(server).put("/1");
  expect(res.status).toBe(200);
  mock.mockRestore();
});

test("/users/:id PUT request - return response status 404 no user to be updated", async () => {
  const mock = jest.spyOn(Users, "findById");
  const mockUpdate = jest.spyOn(Users, "update");
  mock.mockImplementationOnce(() => Promise.resolve());
  mockUpdate.mockImplementationOnce(() => Promise.resolve(changes));
  const res = await request(server).put("/1");
  expect(res.status).toBe(404);
  mock.mockRestore();
});

test("/users/:id PUT request - return response status 500 when server error occurs", async () => {
  const mock = jest.spyOn(Users, "findById");
  const mockUpdate = jest.spyOn(Users, "update");
  mock.mockImplementationOnce(() => Promise.resolve());
  mockUpdate.mockImplementationOnce(() => Promise.resolve(changes));
  const res = await request(server).put("/1");
  expect(res.status).toBe(404);
  mock.mockRestore();
});
