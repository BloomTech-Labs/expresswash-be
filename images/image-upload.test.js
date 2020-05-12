const express = require("express");
const request = require("supertest");
const images = require("./image-upload");
const server = express();
jest.mock("./image-upload");

server.use(express.json());
server.use("/", images);

it("POST for profile picture", async () => {});
