const express = require('express');
const server = express();
const request = require('supertest');
const bcrypt = require('bcryptjs');
const Users = require('../auth/auth-modal');
const authRouter = require('../auth/auth-routerPG');
// jest.mock("./auth-modal");
server.use(express.json());
server.use('/', authRouter);

const findData = [
  {
    id: 1,
    accountType: 'washer',
    email: 'testing123@aol.com222',
    password: '$2a$10$8vtHHAn2Sfjqz7SBhQTZlukqmQW00GtAQ1uGWVxTyfJZecsPvA3HS',
    firstName: 'chris',
    lastName: 'adams',
    phoneNumber: '8675309',
    stripeUUID: 'sdasa8678',
    streetAddress: '1234 cherry ln.',
    streetAddress2: 'apt 69',
    city: 'cabo san lucas',
    state: 'somewhere',
    zip: '23456',
    workStatus: true,
    profilePicture: 'dsakdjsal',
    bannerImage: 'dfjhkslajhdfkljas',
    creationDate: '2020-04-24T14:23:56.864-04:00',
    userRating: 3,
  },
];
const newWasher = {
  rateSmall: 30,
  rateMedium: 50,
  rateLarge: 75,
  aboutMe: 'I am a washer',
  currentLocation: 'lat:27, lon:55',
  available: true,
  washerRating: 3,
};
const newUser = {
  email: 'someemail',
  firstName: 'chris',
  lastName: 'adams',
  password: 'taco',
};
const errorLogin = {
  email: 'testemail',
  password: bcrypt.hashSync('taco', 10),
};
const loginUser = {
  email: 'chris@aol.com',
  password: bcrypt.hashSync('taco', 10),
  accountType: 'washer',
};

test('Gets all users from the /auth endpoint', async () => {
  const mock = jest.spyOn(Users, 'find');
  mock.mockImplementationOnce(() => Promise.resolve(findData));
  const res = await request(server).get('/');
  expect(res.body).toHaveLength(1);
  expect(res.status).toBe(200);
  expect(res.body[0]).toHaveProperty('id');
  expect(res.body[0].firstName).toBe('chris');
  expect(res.type).toBe('application/json');
  mock.mockRestore();
});

test('error on get all users', async () => {
  const mock = jest.spyOn(Users, 'find');
  mock.mockImplementationOnce(() => Promise.reject());
  const res = await request(server).get('/');
  expect(res.status).toBe(500);
  expect(res.body).toMatchObject({ message: 'unable to get all users' });
  mock.mockRestore();
});

test('Posts a new User to the /auth/registerClient endpoint', async () => {
  const mock = jest.spyOn(Users, 'insert');
  mock.mockImplementation(() => Promise.resolve([newUser]));
  const res = await request(server).post('/registerClient').send(newUser);
  expect(res.status).toBe(201);
  expect(res.type).toBe('application/json');
  expect(res.body).toHaveProperty('token');
  expect(res.body).toHaveProperty('user');
  expect(res.body).toMatchObject({ message: 'user created successfully' });
  mock.mockRestore();
});

test('Error on insert of new user', async () => {
  const mock = jest.spyOn(Users, 'insert');
  mock.mockImplementationOnce(() => Promise.reject({ message: 'broke' }));
  const res = await request(server)
    .post('/registerClient')
    .send({ ...newUser, password: 'taco' });
  expect(res.status).toBe(500);
  expect(res.body).toMatchObject({ message: 'unable to register new user' });
  mock.mockRestore();
});

test('Posts a new Washer to the /auth/registerWasher/:id endpoint', async () => {
  const mock = jest.spyOn(Users, 'insertWasher');
  const mockFind = jest.spyOn(Users, 'findWasherId');
  const mockFindUser = jest.spyOn(Users, 'findById');
  mockFindUser.mockImplementationOnce(() =>
    Promise.resolve({ ...newUser, accountType: 'washer' })
  );
  mock.mockImplementationOnce(() => Promise.resolve(1));
  mockFind.mockImplementationOnce(() => Promise.resolve(false));
  const res = await request(server).post('/registerWasher/1').send(newWasher);
  expect(res.status).toBe(201);
  expect(res.body).toHaveProperty('user');
  expect(res.body.user).toHaveProperty('washer');
  mock.mockRestore();
  mockFind.mockRestore();
  mockFindUser.mockRestore();
});
test('Error message on insert washer', async () => {
  const mock = jest.spyOn(Users, 'insertWasher');
  const mockFindUser = jest.spyOn(Users, 'findById');
  const mockIfWasherExists = jest.spyOn(Users, 'findWasherId');
  mockFindUser.mockImplementationOnce(() =>
    Promise.resolve({ ...newUser, accountType: 'washer' })
  );
  mockIfWasherExists.mockImplementationOnce(() => Promise.resolve(false));
  mock.mockImplementationOnce(() => Promise.reject());
  const res = await request(server).post('/registerWasher/1').send(newWasher);
  expect(res.status).toBe(500);
  expect(res.body).toMatchObject({ message: 'unable to add washer' });
  mock.mockRestore();
  mockFindUser.mockRestore();
  mockIfWasherExists.mockRestore();
});

test('Error message on account not having the type of washer', async () => {
  const mock = jest.spyOn(Users, 'insertWasher');
  const mockFindUser = jest.spyOn(Users, 'findById');
  const mockIfWasherExists = jest.spyOn(Users, 'findWasherId');
  mockFindUser.mockImplementationOnce(() => Promise.resolve(newUser));
  mockIfWasherExists.mockImplementationOnce(() => Promise.resolve(false));
  mock.mockImplementationOnce(() => Promise.resolve(1));
  const res = await request(server).post('/registerWasher/1').send(newWasher);
  expect(res.status).toBe(403);
  expect(res.body).toMatchObject({
    message: 'user does not have an account type of washer',
  });
  mock.mockRestore();
  mockFindUser.mockRestore();
  mockIfWasherExists.mockRestore();
});

test('Get list of washers', async () => {
  const mock = jest.spyOn(Users, 'findWasher');
  mock.mockImplementationOnce(() => Promise.resolve([newWasher]));
  const res = await request(server).get('/washers');
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
  expect(res.type).toBe('application/json');
  mock.mockRestore();
});

test('Error on washers get request', async () => {
  const mock = jest.spyOn(Users, 'findWasher');
  mock.mockImplementationOnce(() => Promise.reject());
  const res = await request(server).get('/washers');
  expect(res.status).toBe(500);
  expect(res.body).toMatchObject({ message: 'unable to get washers' });
  mock.mockRestore();
});

test('Log user in to the /auth/login endpoint', async () => {
  const mock = jest.spyOn(Users, 'findByEmail');
  const mockFindWasher = jest.spyOn(Users, 'findWasherId');
  mock.mockImplementationOnce(() => Promise.resolve(loginUser));
  mockFindWasher.mockImplementationOnce(() => Promise.resolve(newWasher));
  const res = await request(server)
    .post('/login')
    .send({ email: 'someEmail', password: 'taco' });
  expect(res.status).toBe(200);
  expect(res.body).toHaveProperty('token');
  expect(res.body).toHaveProperty('user');
  expect(res.body.user).toHaveProperty('washer');
  mock.mockRestore();
  mockFindWasher.mockRestore();
});
test('error on find a washer on login', async () => {
  const mock = jest.spyOn(Users, 'findByEmail');
  const mockFind = jest.spyOn(Users, 'findWasherId');
  mock.mockImplementationOnce(() =>
    Promise.resolve({
      email: 'chris@aol',
      password: bcrypt.hashSync('taco', 10),
      accountType: 'washer',
    })
  );
  mockFind.mockImplementationOnce(() => Promise.reject());
  const res = await request(server)
    .post('/login')
    .send({ email: 'some', password: 'taco' });
  expect(res.status).toBe(500);
  expect(res.body).toMatchObject({ message: 'unable to find washer data' });
  mock.mockRestore();
  mockFind.mockRestore();
});

test('error on password decription on login', async () => {
  const mockEmail = jest.spyOn(Users, 'findByEmail');
  mockEmail.mockImplementationOnce(() => Promise.resolve(errorLogin));
  const res = await request(server)
    .post('/login')
    .send({ email: 'someEmail', password: 'tac' });
  expect(res.status).toBe(403);
  expect(res.body).toMatchObject({ message: 'invalid email and/or password' });
  mockEmail.mockRestore();
});

test('error for miising email or password on login', async () => {
  const res = await request(server).post('/login').send({ email: 'someEmail' });
  expect(res.status).toBe(403);
  expect(res.body).toMatchObject({
    message: 'email and password fields cannot be blank',
  });
});

test('Login as user and not a washer', async () => {
  const mockEmail = jest.spyOn(Users, 'findByEmail');
  mockEmail.mockImplementationOnce(() => Promise.resolve(errorLogin));
  const res = await request(server)
    .post('/login')
    .send({ email: 'someEmail', password: 'taco' });
  expect(res.status).toBe(200);
  expect(res.body).toHaveProperty('user');
  expect(res.body).not.toHaveProperty('washer');
  mockEmail.mockRestore();
});

test('error in find by email on login ', async () => {
  const mock = jest.spyOn(Users, 'findByEmail');
  mock.mockImplementationOnce(() => Promise.reject());
  const res = await request(server)
    .post('/login')
    .send({ email: 'someEmail', password: 'taco' });
  expect(res.status).toBe(403);
  expect(res.body).toMatchObject({ message: 'email not registered to user' });
  mock.mockRestore();
});
