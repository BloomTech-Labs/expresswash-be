const express = require("express");
const server = express();
const request = require("supertest");
const Cars = require("./cars-model");
const carsRouter = require("./cars-routerPG");

server.use(express.json());
server.use("/", carsRouter);

test("/cars/ GET request - return all cars in car table- status 200", async () => {
  const mock = jest.spyOn(Cars, "getAll");
  mock.mockImplementationOnce(() => Promise.resolve());
  const res = await request(server).get("/");
  expect(res.status).toBe(200);
  mock.mockRestore();
});

test("/cars/ GET request - return error - status 500", async () => {
  const mock = jest.spyOn(Cars, "getAll");
  mock.mockImplementationOnce(() => Promise.reject());
  const res = await request(server).get("/");
  expect(res.status).toBe(500);
  mock.mockRestore();
});

test("/cars/:carId GET request - return car by id - status code 200", async () => {
  const mock = jest.spyOn(Cars, "findBy");
  mock.mockImplementationOnce(() => Promise.resolve(3));
  const res = await request(server).get("/3");
  expect(res.status).toBe(200);
  mock.mockRestore();
});

test("/cars/ POST request - returns the added car- status code 201", async () => {
  const mock = jest.spyOn(Cars, "addCar");
  const newCar = {
    carId: 3,
    clientId: 1,
    make: "Toyota",
    model: "hello there",
    year: 2005,
    color: "Gold",
    licensePlate: "0123456789",
    photo: "",
    category: "SUV",
    size: "M",
  };
  mock.mockImplementationOnce(() => Promise.resolve(newCar));
  const res = await request(server).post("/");
  expect(res.status).toBe(201);
  mock.mockRestore();
});
test("/cars/ POST request - returns error- status code 500", async () => {
  const mock = jest.spyOn(Cars, "addCar");
  mock.mockImplementationOnce(() => Promise.reject({ message: "broken" }));
  const res = await request(server).post("/");
  expect(res.status).toBe(500);
  mock.mockRestore();
});

test("/cars/:carId PUT request - returns the modified car - status code 200", async () => {
  const mock = jest.spyOn(Cars, "update");
  mock.mockImplementationOnce(() => Promise.resolve({ model: "something" }, 3));
  const res = await request(server).put("/3");
  expect(res.status).toBe(200);
  mock.mockRestore();
});

test("/cars/:carId PUT request - returns error- status code 500", async () => {
  const mock = jest.spyOn(Cars, "update");
  mock.mockImplementationOnce(() => Promise.reject());
  const res = await request(server).put("/2");
  expect(res.status).toBe(500);
  mock.mockRestore();
});

test("/cars/:carId DELETE request - deletes a car by carId successfuly- status code 200", async () => {
  const mock = jest.spyOn(Cars, "remove");
  mock.mockImplementationOnce(() => Promise.resolve(3));
  const res = await request(server).delete("/3");
  expect(res.status).toBe(200);
  mock.mockRestore();
});

test("/cars/:carId DELETE request - returns error- status code 500", async () => {
  const mock = jest.spyOn(Cars, "remove");
  mock.mockImplementationOnce(() => Promise.reject());
  const res = await request(server).delete("/3");
  expect(res.status).toBe(500);
  mock.mockRestore();
});
