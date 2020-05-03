const db = require('../database/dbConfig.js');
const request = require('supertest');
const server = require('../api/server.js');

describe('the cars router', () => {
    const make = {make:"BMW"};

    describe('the manufacturers list', () => {
        it('should return a status 200', async () => {
            //test setup
            return request(server)
            .get('/cars/makes')
            .then(res => {
                expect(res.status).toBe(200);
            })
        });
        it('should return all 69 manufacturers from the database', async () => {
            //test setup
            return request(server)
            .get('/cars/makes')
            .then(res => {
                expect(res.body.length).toBe(69);
            })
        })
    });

    describe('the cars list', () => {
        it('should return a status 200', async () => {
            //test setup
            return request(server)
            .post('/cars/carsByManufacturer')
            .send(make)
            .then(res => {
                expect(res.status).toBe(200);
            })
        });
        it('should return an array containing all 133 BMW models from the database', async () => {
            //test setup
            return request(server)
            .post('/cars/carsByManufacturer')
            .send(make)
            .then(res => {
                expect(res.body.length).toBe(133);
            })
        })
    });
})