const express = require("express");
const testServer = express();
const request = require("supertest");
const server = require("../api/server.js");
testServer.use(express.json());
testServer.use("/", server);

test("server is running on home route", async () => {
  const res = await request(testServer).get("/");
  expect(res.status).toBe(200);
  expect(res.body).toMatchObject({ message: "Backend is up and running" });
});
test("server error for 404", async () => {
  const res = await request(testServer).get("/a");
  expect(res.status).toBe(404);
});
test("server error for 404", async () => {
  const res = await request(testServer).get("/a");
  expect(res.status).toBe(404);
});
