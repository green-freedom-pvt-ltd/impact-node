/*jshint esversion: 6 */

const sum = require('./sum');
const db = require('../db/index');
const request = require('supertest');
const app = require('../server')

// db.connect();


// test('get important data from db', () => {
//   expect(db.getImportantData()).toBe('important data');
// });



// this test case tests if the response code for
// get request is 200
test('It should response the GET method', (done) => {
    request(app).get('/').then((response) => {
    	console.log("response",response.text);
        expect(response.statusCode).toBe(200);
        done();
    });
});


// this test case gets list of cities and
// passes the test if the total count of 
// cities is greater than 10
test('It should response the GET city', (done) => {
    request(app).get('/city/').then((response) => {
    	console.log("response-----------",JSON.parse(response.text).count);
        expect(JSON.parse(response.text).count).toBeGreaterThan(10);
        done();
    });
});