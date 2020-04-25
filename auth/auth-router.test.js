const db = require("../database/dbConfig.js");
const request = require("supertest");
const server = require("../api/server.js");

describe("the authentication", () => {
  beforeEach(async () => {
    await db("users").truncate();
  });
  const credentials = {
    email: "test@test.con",
    firstName: "Vegan",
    lastName: "Falafel",
    password: "1234",
    phoneNumber: "1234567890",
    streetAddress: "1051 Market St",
    streetAddress2: "APT 240",
    city: "San Francisco",
    State: "California",
    zip: "94103",
  };

  const loginCredentials = {
    email: "test@test.con",
    password: "1234",
  };

  describe("the client registration", () => {
    it("should return a token on successful registration", async () => {
      // test setup
      return request(server)
        .post("/auth/registerClient")
        .send(credentials)
        .then((res) => {
          expect("token" in res.body);
        });
    });
    it("should return a status 201 for user created", async () => {
      //test setup
      return request(server)
        .post("/auth/registerClient")
        .send(credentials)
        .then((res) => {
          expect(res.status).toBe(201);
        });
    });
  });

  describe("the washer registration", () => {
    it("should return a token on successful registration", async () => {
      // test setup
      return request(server)
        .post("/auth/registerWasher")
        .send(credentials)
        .then((res) => {
          expect("token" in res.body);
        });
    });
    it("should return a status 201 for user created", async () => {
      //test setup
      return request(server)
        .post("/auth/registerWasher")
        .send(credentials)
        .then((res) => {
          expect(res.status).toBe(201);
        });
    });
  });

  describe("the singular login", () => {
    it("should return a token on successful login", async () => {
      // test setup
      return request(server)
        .post("/auth/registerWasher")
        .send(credentials)
        .then((res) => {
          return request(server)
            .post("/auth/login")
            .send(loginCredentials)
            .then((res) => {
              expect(typeof res.body.token).toBe("string");
            });
        });
    });
    it("should return a status 200 for user logged in", async () => {
      // test setup
      return request(server)
        .post("/auth/registerWasher")
        .send(credentials)
        .then((res) => {
          return request(server)
            .post("/auth/login")
            .send(loginCredentials)
            .then((res) => {
              expect(res.status).toBe(200);
            });
        });
    });
    it("should return the user type", async () => {
      // test setup
      return request(server)
        .post("/auth/registerWasher")
        .send(credentials)
        .then((res) => {
          return request(server)
            .post("/auth/login")
            .send(loginCredentials)
            .then((res) => {
              expect(res.body.userType).toBe("washer");
            });
        });
    });
  });

  describe("the get users emails endpoint", () => {
    it("should return a count of 1 showing a user account was created", async () => {
      // test setup
      return request(server)
        .post("/auth/registerWasher")
        .send(credentials)
        .then((res) => {
          return request(server)
            .get("/auth/users/")
            .then((res) => {
              expect(res.body.length).toBe(1);
            });
        });
    });
    it("should return a list containing emails", async () => {
      // test setup
      return request(server)
        .post("/auth/registerWasher")
        .send(credentials)
        .then((res) => {
          return request(server)
            .get("/auth/users/")
            .then((res) => {
              expect(res.body[0].email).toBe("test@test.con");
            });
        });
    });
  });
});
