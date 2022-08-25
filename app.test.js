process.env.NODE_ENV = "test";

const request = require("supertest");

const app = require('./app')


describe('Get mean', function(){
    test('get mean from 1,2,3,4', async function() {
        const resp = await request(app).get(`/mean?nums=1,2,3,4`);
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({'operation': 'mean', 'value': 2.5})
    });    
    test('get error when not giving numbers', async function() {
        const resp = await request(app).get(`/mean`);
        expect(resp.statusCode).toBe(400);
        expect(resp.body).toEqual({'error': { message: 'Please enter at least 2 numbers', 'status': 400 }})
    })
    test('get error when enter a non number', async function() {
        const resp = await request(app).get(`/mean?nums=1,2,foo`);
        expect(resp.statusCode).toBe(400);
        expect(resp.body).toEqual({'error': { message: 'Please enter all valid numbers', 'status': 400 }})
    })
});

describe('get median', function() {
    test('get median from even amount of numbers', async function() {
        const resp = await request(app).get(`/median?nums=1,2,3,4`);
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({'operation': 'median', 'value': 2.5})
    });  
    test('get median from odd amount of numbers', async function() {
        const resp = await request(app).get(`/median?nums=1,2,3,4,5`);
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({'operation': 'median', 'value': 3})
    });  
    test('get error when not giving numbers', async function() {
        const resp = await request(app).get(`/median`);
        expect(resp.statusCode).toBe(400);
        expect(resp.body).toEqual({'error': { message: 'Please enter at least 2 numbers', 'status': 400 }})
    })
    test('get error when enter a non number', async function() {
        const resp = await request(app).get(`/median?nums=1,2,foo`);
        expect(resp.statusCode).toBe(400);
        expect(resp.body).toEqual({'error': { message: 'Please enter all valid numbers', 'status': 400 }})
    })
})

describe('get mode', function() {
    test('get mode from even amount of numbers', async function() {
        const resp = await request(app).get(`/mode?nums=1,2,3,4`);
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({'operation': 'mode', 'value': [1,2,3,4]})
    });  
    test('get mode from odd amount of numbers', async function() {
        const resp = await request(app).get(`/mode?nums=1,2,2,3,4,5`);
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({'operation': 'mode', 'value': 2})
    });  
    test('get error when not giving numbers', async function() {
        const resp = await request(app).get(`/median`);
        expect(resp.statusCode).toBe(400);
        expect(resp.body).toEqual({'error': { message: 'Please enter at least 2 numbers', 'status': 400 }})
    })
    test('get error when enter a non number', async function() {
        const resp = await request(app).get(`/median?nums=1,2,foo`);
        expect(resp.statusCode).toBe(400);
        expect(resp.body).toEqual({'error': { message: 'Please enter all valid numbers', 'status': 400 }})
    })
})