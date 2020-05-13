const express = require("express");
const request = require("supertest");
const server = express();
jest.mock("multer");
jest.mock("multer-s3");
const Users = require("../users/users-model");
const imageRouter = require("./image-upload");
server.use(express.json());
server.use("/", imageRouter);

req = { file: { location: "fonz" } };
test("please work", async () => {
  const mock = jest.spyOn(Users, "update");
  const mockId = jest.spyOn(Users, "findById");
  mockId.mockImplementation(() => Promise.resolve({ id: 1 }));
  mock.mockImplementation(() => Promise.reject(req));

  const res = await request(server)
    .post("/profile/1", req)
    .attach({ file: { location } });
  console.log(res.error);
  mock.mockRestore();
  mockId.mockRestore();
});
