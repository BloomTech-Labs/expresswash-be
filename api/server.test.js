const db = require('../database/dbConfig.js');
const request = require('supertest');
const server = require('./server.js');

describe('the server is running', () => {
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

    describe('the server is running message', () => {
        it('should return a specific message', async () => {
            // test setup
            return request(server)
            .get('/')
            .then(res => {
                expect(res.body.message).toBe('Backend is up and running');
            })
        });
        it('should return a status 200', async () => {
            //test setup
            return request(server)
            .get('/')
            .then(res => {
                expect(res.status).toBe(200);
            })
        });
    });
});