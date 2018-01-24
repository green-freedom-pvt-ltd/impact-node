/*jshint esversion: 6 */

const request = require('supertest');
const app = require('../../server')


// this test case tests if the response code for
// get request is 200
test('get user feedback from ced route', (done) => {
    request(app)
    .get('/v0/ced/userFeedback/')
    .set('Authorization', '4142134awfdsfaef2q3q234dfzSdfAiocvnhvpi113135knuoa')
    .then((response) => {
    	console.log("response",response.text);
        expect(response.statusCode).toBe(200);
        done();
    });
});

// this test case gets list of cities and
// passes the test if the total count of 
// cities is greater than 10
// test('It should response the GET city', (done) => {
//     request(app).get('/city/').then((response) => {
//     	console.log("response-----------",JSON.parse(response.text).count);
//         expect(JSON.parse(response.text).count).toBeGreaterThan(10);
//         done();
//     });
// });