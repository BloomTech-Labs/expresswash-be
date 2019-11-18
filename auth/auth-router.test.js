const db = require('../database/dbConfig.js');
const request = require('supertest');
const server = require('../api/server.js');

describe('the authentication', () => {
    beforeEach(async () => {
        await db('users').truncate();
    });
    const credentials = {
        "email":"test@test.con",
        "firstName":"Vegan",
        "lastName":"Falafel",
        "password":"1234",
        "phoneNumber":"1234567890",
        "streetAddress":"1051 Market St",
        "streetAddress2":"APT 240",
        "city":"San Francisco",
        "State":"California", 
        "zip":"94103"
    };

    describe('the client registration', () => {
        it('should return a token on successful registration', async () => {
            // test setup
            return request(server)
            .post('/auth/registerClient')
            .send(credentials)
            .then(res => {
                expect('token' in res.body);
            })
        });
        it('should return a status 201 for user created', async () => {
            //test setup
            return request(server)
            .post('/auth/registerClient')
            .send(credentials)
            .then(res => {
                expect(res.status).toBe(201);
            })
        });
    });

    describe('the washer registration', () => {
        it('should return a token on successful registration', async () => {
            // test setup
            return request(server)
            .post('/auth/registerWasher')
            .send(credentials)
            .then(res => {
                expect('token' in res.body);
            })
        });
        it('should return a status 201 for user created', async () => {
            //test setup
            return request(server)
            .post('/auth/registerWasher')
            .send(credentials)
            .then(res => {
                expect(res.status).toBe(201);
            })
        });
    });
});