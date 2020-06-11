const express = require("express");
const server = express();
const request = require("supertest");
const Users = require("../users/users-model");
const Washer = require("../auth/auth-modal");
const usersRouter = require("../users/users-router");

server.use(express.json());
server.use("/", usersRouter);

test("/users/ GET request - return all users in users table status 200", async () => {
  const mock = jest.spyOn(Users, "find");
  mock.mockImplementationOnce(() => Promise.resolve([]));
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
  const mockWasher = jest.spyOn(Washer, "findWasherId");
  const mockCars = jest.spyOn(Users, "getUserCars");
  mock.mockImplementationOnce(() =>
    Promise.resolve({ id: 2, accountType: "washer" })
  );
  mockCars.mockImplementationOnce(() => Promise.resolve([{ cars: "cars" }]));
  mockWasher.mockImplementationOnce(() => Promise.resolve());
  const res = await request(server).get("/2");
  expect(res.status).toBe(200);
  mock.mockRestore();
  mockWasher.mockRestore();
  mockCars.mockRestore();
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
  const mock = jest.spyOn(Users, "findById");
  mock.mockImplementationOnce(() => Promise.resolve(false));
  const res = await request(server).delete("/2");
  expect(res.status).toBe(404);
  mock.mockRestore();
});
test("/users/:id DELETE request - return response status 500 when server error occurs", async () => {
  const mock = jest.spyOn(Users, "findById");
  const mockdel = jest.spyOn(Users, "del");
  mock.mockImplementationOnce(() => Promise.resolve(1));
  mockdel.mockImplementationOnce(() => Promise.reject({ message: "broke" }));
  const res = await request(server).delete("/1");
  expect(res.status).toBe(500);
  mock.mockRestore();
  mockdel.mockRestore();
});
changes = { firstName: "new", lastName: "old" };
test("/users/:id PUT request - return response status 200 when user successfully updated", async () => {
  const mock = jest.spyOn(Users, "findById");
  const mockUpdate = jest.spyOn(Users, "update");
  mock.mockImplementationOnce(() => Promise.resolve(1));
  mockUpdate.mockImplementationOnce(() => Promise.resolve([changes]));
  const res = await request(server).put("/1");
  expect(res.status).toBe(200);
  mock.mockRestore();
  mockUpdate.mockRestore();
});
test("/users/:id PUT request - return response status 404 no user to be updated", async () => {
  const mock = jest.spyOn(Users, "findById");
  const mockUpdate = jest.spyOn(Users, "update");
  mock.mockImplementationOnce(() => Promise.resolve());
  mockUpdate.mockImplementationOnce(() => Promise.resolve(changes));
  const res = await request(server).put("/1");
  expect(res.status).toBe(404);
  mock.mockRestore();
  mockUpdate.mockRestore();
});
test("/users/:id PUT request - return response status 500 when server error occurs", async () => {
  const mock = jest.spyOn(Users, "findById");
  const mockUpdate = jest.spyOn(Users, "update");
  mock.mockImplementationOnce(() => Promise.resolve());
  mockUpdate.mockImplementationOnce(() => Promise.resolve(changes));
  const res = await request(server).put("/1");
  expect(res.status).toBe(404);
  mock.mockRestore();
  mockUpdate.mockRestore();
});
test("/users/rating/:id PUT request add rating to new user", async () => {
  const mock = jest.spyOn(Users, "findById");
  const mockUpdate = jest.spyOn(Users, "update");
  mock.mockImplementationOnce(() =>
    Promise.resolve({ userRatingTotal: 0, userRating: 4 })
  );
  mockUpdate.mockImplementationOnce(() =>
    Promise.resolve({ id: 1, userRating: 4 })
  );
  const res = await request(server).put("/rating/1").send({
    userRating: 4,
  });
  expect(res.status).toBe(201);
  expect(res.body).toHaveProperty("id");
  mock.mockRestore();
  mockUpdate.mockRestore();
});
test("/users/rating/:id PUT request update rating on existing user", async () => {
  const mock = jest.spyOn(Users, "findById");
  const mockUpdate = jest.spyOn(Users, "update");
  mock.mockImplementationOnce(() =>
    Promise.resolve({ userRatingTotal: 1, userRating: 4 })
  );
  mockUpdate.mockImplementationOnce(() =>
    Promise.resolve({ id: 1, userRating: 4 })
  );
  const res = await request(server).put("/rating/1").send({
    userRating: 4,
  });
  expect(res.status).toBe(201);
  expect(res.body).toHaveProperty("id");
  mock.mockRestore();
  mockUpdate.mockRestore();
});
test("/users/rating/:id PUT error on findById in rating endpoint", async () => {
  const mock = jest.spyOn(Users, "findById");
  mock.mockImplementationOnce(() => Promise.reject());
  const res = await request(server).put("/rating/1").send({
    userRating: 4,
  });
  expect(res.status).toBe(500);
  expect(res.body).toMatchObject({
    message: `user with the id 1 does not exist`,
  });
  mock.mockRestore();
});
test("/users/rating/:id PUT error in update existing user", async () => {
  const mock = jest.spyOn(Users, "findById");
  const mockUpdate = jest.spyOn(Users, "update");
  mock.mockImplementationOnce(() =>
    Promise.resolve({ userRatingTotal: 1, userRating: 4 })
  );
  mockUpdate.mockImplementationOnce(() => Promise.reject({ message: "broke" }));
  const res = await request(server).put("/rating/1").send({
    userRating: 4,
  });
  expect(res.status).toBe(500);
  expect(res.body).toMatchObject({ message: "error in updating the user" });
  mock.mockRestore();
  mockUpdate.mockRestore();
});
test("/users/rating/:id PUT error in update new user", async () => {
  const mock = jest.spyOn(Users, "findById");
  const mockUpdate = jest.spyOn(Users, "update");
  mock.mockImplementationOnce(() =>
    Promise.resolve({ userRatingTotal: 0, userRating: 4 })
  );
  mockUpdate.mockImplementationOnce(() => Promise.reject({ message: "broke" }));
  const res = await request(server).put("/rating/1").send({
    userRating: 4,
  });
  expect(res.status).toBe(500);
  expect(res.body).toMatchObject({ message: "error updating the user rating" });
  mock.mockRestore();
  mockUpdate.mockRestore();
});
test("/users/washer/rating/:id PUT request add rating to new washer", async () => {
  const mock = jest.spyOn(Users, "findByWasherId");
  const mockUpdate = jest.spyOn(Users, "updateWasher");
  mock.mockImplementationOnce(() =>
    Promise.resolve({ washerRatingTotal: 0, washerRating: 4 })
  );
  mockUpdate.mockImplementationOnce(() =>
    Promise.resolve({ id: 1, washerRating: 4 })
  );
  const res = await request(server).put("/washer/rating/1").send({
    washerRating: 4,
  });
  expect(res.status).toBe(201);
  expect(res.body).toHaveProperty("id");
  mock.mockRestore();
  mockUpdate.mockRestore();
});
test("/users/washer/rating/:id PUT request update rating on existing washer", async () => {
  const mock = jest.spyOn(Users, "findByWasherId");
  const mockUpdate = jest.spyOn(Users, "updateWasher");
  mock.mockImplementationOnce(() =>
    Promise.resolve({ washerRatingTotal: 1, washerRating: 4 })
  );
  mockUpdate.mockImplementationOnce(() =>
    Promise.resolve({ id: 1, washerRating: 4 })
  );
  const res = await request(server).put("/washer/rating/1").send({
    washerRating: 4,
  });
  expect(res.status).toBe(201);
  expect(res.body).toHaveProperty("id");
  mock.mockRestore();
  mockUpdate.mockRestore();
});
test("/users/washer/rating/:id PUT error on findByWasherId in rating endpoint", async () => {
  const mock = jest.spyOn(Users, "findByWasherId");
  mock.mockImplementationOnce(() => Promise.reject());
  const res = await request(server).put("/washer/rating/1").send({
    washerRating: 4,
  });
  expect(res.status).toBe(500);
  expect(res.body).toMatchObject({
    message: `washer with the id 1 does not exist`,
  });
  mock.mockRestore();
});
test("/users/washer/rating/:id PUT error in update existing washer", async () => {
  const mock = jest.spyOn(Users, "findByWasherId");
  const mockUpdate = jest.spyOn(Users, "updateWasher");
  mock.mockImplementationOnce(() =>
    Promise.resolve({ washerRatingTotal: 1, washerRating: 4 })
  );
  mockUpdate.mockImplementationOnce(() => Promise.reject());
  const res = await request(server).put("/washer/rating/1").send({
    washerRating: 4,
  });
  expect(res.status).toBe(500);
  expect(res.body).toMatchObject({ message: "error in updating the washer" });
  mock.mockRestore();
  mockUpdate.mockRestore();
});
test("/users/washer/rating/:id PUT error in update new user", async () => {
  const mock = jest.spyOn(Users, "findByWasherId");
  const mockUpdate = jest.spyOn(Users, "updateWasher");
  mock.mockImplementationOnce(() =>
    Promise.resolve({ washerRatingTotal: 0, washerRating: 4 })
  );
  mockUpdate.mockImplementationOnce(() => Promise.reject());
  const res = await request(server).put("/washer/rating/1").send({
    washerRating: 4,
  });
  expect(res.status).toBe(500);
  expect(res.body).toMatchObject({
    message: "error updating the washer rating",
  });
  mock.mockRestore();
  mockUpdate.mockRestore();
});

test("/washer/:id PUT edits existing washer table", async () => {
  const mockWasher = jest.spyOn(Users, "findByWasherId");
  const mock = jest.spyOn(Users, "updateWasher");
  mockWasher.mockImplementationOnce(() => Promise.resolve());
  mock.mockImplementationOnce(() =>
    Promise.resolve({ currentLocationLat: 1, currentLocationLon: 1 })
  );
  const res = await request(server).put("/washer/1");
  expect(res.status).toBe(201);
  mock.mockRestore();
  mockWasher.mockRestore();
});

test("/washer/:id PUT fails to find  existing washer ", async () => {
  const mockWasher = jest.spyOn(Users, "findByWasherId");
  const mock = jest.spyOn(Users, "updateWasher");
  mockWasher.mockImplementationOnce(() => Promise.reject());
  mock.mockImplementationOnce(() => Promise.resolve());
  const res = await request(server).put("/washer/1");
  expect(res.status).toBe(404);
  mock.mockRestore();
  mockWasher.mockRestore();
});

test("/washer/:id PUT fails to find  existing washer ", async () => {
  const mockWasher = jest.spyOn(Users, "findByWasherId");
  const mock = jest.spyOn(Users, "updateWasher");
  mockWasher.mockImplementationOnce(() => Promise.resolve());
  mock.mockImplementationOnce(() => Promise.reject({ message: "broke" }));
  const res = await request(server).put("/washer/1");
  expect(res.status).toBe(500);
  mock.mockRestore();
  mockWasher.mockRestore();
});
