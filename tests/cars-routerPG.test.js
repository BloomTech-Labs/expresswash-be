const express = require("express");
const server = express();
const request = require("supertest");
const Cars = require("../cars/cars-model");
const Users = require("../users/users-model");
const carsRouter = require("../cars/cars-routerPG");

server.use(express.json());
server.use("/", carsRouter);
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
  const mockUserFindById = jest.spyOn(Users, "findById");
  mockUserFindById.mockImplementationOnce(() => Promise.resolve(1));
  mock.mockImplementationOnce(() => Promise.resolve(newCar));
  const res = await request(server).post("/").send(newCar);
  expect(res.status).toBe(201);
  expect(res.body).toHaveProperty("year", 2005);
  mock.mockRestore();
  mockUserFindById.mockRestore();
});

test("/cars/ POST request - returns missing property/ies error - status code 400", async () => {
  const mock = jest.spyOn(Cars, "addCar");
  const mockUserFindById = jest.spyOn(Users, "findById");
  mockUserFindById.mockImplementationOnce(() => Promise.resolve(1));
  mock.mockImplementationOnce(() => Promise.resolve({ make: "test" }));
  const res = await request(server).post("/").send({ make: "test" });
  expect(res.status).toBe(400);
  expect(res.body).toMatchObject({
    error: res.body.error,
  });
  mock.mockRestore();
  mockUserFindById.mockRestore();
});

test("/cars/ POST request - returns error- status code 500", async () => {
  const mock = jest.spyOn(Cars, "addCar");
  const mockUserFindById = jest.spyOn(Users, "findById");
  mockUserFindById.mockImplementationOnce(() => Promise.resolve(1));
  mock.mockImplementationOnce(() => Promise.reject());
  const res = await request(server).post("/").send(newCar);
  expect(res.status).toBe(500);
  mock.mockRestore();
  mockUserFindById.mockRestore();
});

test("/cars/ POST request - returns missing car body error - status code 400", async () => {
  const mock = jest.spyOn(Cars, "addCar");
  const mockUserFindById = jest.spyOn(Users, "findById");
  mockUserFindById.mockImplementationOnce(() => Promise.resolve(1));
  mock.mockImplementationOnce(() => Promise.reject());
  const res = await request(server).post("/").send({});
  expect(res.status).toBe(400);
  expect(res.body).toMatchObject({ error: res.body.error });
  mock.mockRestore();
  mockUserFindById.mockRestore();
});

test("/cars/:carId PUT request - returns the modified car - status code 200", async () => {
  const mock = jest.spyOn(Cars, "update");
  const mockUserFindById = jest.spyOn(Users, "findById");
  const mockCarFind = jest.spyOn(Cars, "findBy");
  mockCarFind.mockImplementationOnce(() => Promise.resolve(newCar));
  mockUserFindById.mockImplementationOnce(() => Promise.resolve(1));
  mock.mockImplementationOnce(() => Promise.resolve());
  const res = await request(server).put("/6").send(newCar);
  expect(res.status).toBe(200);
  expect(res.body).toMatchObject({ message: res.body.message });
  mock.mockRestore();
  mockUserFindById.mockRestore();
  mockCarFind.mockRestore();
});

test("/cars/:carId PUT request - returns car does not exist error - status code 400", async () => {
  const mock = jest.spyOn(Cars, "update");
  const mockUserFindById = jest.spyOn(Users, "findById");
  mockUserFindById.mockImplementationOnce(() => Promise.resolve(1));
  mock.mockImplementationOnce(() => Promise.resolve());
  const res = await request(server).put("/1").send(newCar);
  expect(res.status).toBe(400);
  expect(res.body).toMatchObject({ message: res.body.message });
  mock.mockRestore();
  mockUserFindById.mockRestore();
});

test("/cars/:carId PUT request - returns that user does not exist error - status code 400", async () => {
  const mock = jest.spyOn(Cars, "update");
  const mockCarFind = jest.spyOn(Cars, "findBy");
  mockCarFind.mockImplementationOnce(() => Promise.resolve(newCar));
  const mockUserFindById = jest.spyOn(Users, "findById");
  mockUserFindById.mockImplementationOnce(() => Promise.resolve(false));
  mock.mockImplementationOnce(() => Promise.resolve());
  const res = await request(server).put("/6").send(newCar);
  expect(res.status).toBe(400);
  expect(res.body).toMatchObject({ error: res.body.error });
  mock.mockRestore();
  mockUserFindById.mockRestore();
  mockCarFind.mockRestore();
});

test("/cars/:carId PUT request - returns error- status code 500", async () => {
  const mock = jest.spyOn(Cars, "update");
  const mockCarFind = jest.spyOn(Cars, "findBy");
  mockCarFind.mockImplementationOnce(() => Promise.resolve(newCar));
  const mockUserFindById = jest.spyOn(Users, "findById");
  mockUserFindById.mockImplementationOnce(() => Promise.resolve(1));
  mock.mockImplementationOnce(() => Promise.reject());
  const res = await request(server).put("/6").send(newCar);
  expect(res.status).toBe(500);
  mock.mockRestore();
  mockCarFind.mockRestore();
});

test("/cars/:carId DELETE request - deletes a car by carId successfuly- status code 200", async () => {
  const mock = jest.spyOn(Cars, "remove");
  const mockCarFind = jest.spyOn(Cars, "findBy");
  mockCarFind.mockImplementationOnce(() => Promise.resolve(newCar));
  mock.mockImplementationOnce(() => Promise.resolve(6));
  const res = await request(server).delete("/6");
  expect(res.status).toBe(200);
  expect(res.body).toMatchObject({ message: res.body.message });
  mock.mockRestore();
  mockCarFind.mockRestore();
});

test("/cars/:carId DELETE request - returns that car does not exist error - status code 400", async () => {
  const mock = jest.spyOn(Cars, "remove");
  mock.mockImplementationOnce(() => Promise.resolve(6));
  const res = await request(server).delete("/1");
  expect(res.status).toBe(400);
  expect(res.body).toMatchObject({ message: res.body.message });
  mock.mockRestore();
});

test("/cars/:carId DELETE request - returns error- status code 500", async () => {
  const mock = jest.spyOn(Cars, "remove");
  const mockCarFind = jest.spyOn(Cars, "findBy");
  mockCarFind.mockImplementationOnce(() => Promise.resolve(newCar));
  mock.mockImplementationOnce(() => Promise.reject());
  const res = await request(server).delete("/6");
  expect(res.status).toBe(500);
  mock.mockRestore();
  mockCarFind.mockRestore();
});
