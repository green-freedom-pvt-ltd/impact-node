/*jshint esversion: 6 */

const request = require('supertest');
const app = require('../server')
var api_path={
    user_feedback : '/v0/ced/userFeedback/',
    runs : '/v0/ced/runs/',
}

// this test case tests if the response code for
// get request is 200


// check the response code to be 200
test('get user feedback from ced route', (done) => {
    request(app)
    .get(api_path.user_feedback)
    .set('Authorization', '4142134awfdsfaef2q3q234dfzSdfAiocvnhvpi113135knuoa')
    .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
    });
});


// check api count greater than 200
test('get user feedback from ced route', (done) => {
    request(app)
    .get(api_path.user_feedback)
    .set('Authorization', '4142134awfdsfaef2q3q234dfzSdfAiocvnhvpi113135knuoa')
    .then((response) => {
        var jsonResponse = JSON.parse(response.text);
        console.log("testing for--------------------- " + jsonResponse.count);
        expect(jsonResponse.count).toBeGreaterThan(200);
        done();
    });
});


// check api limit to be equal to 5
test('get user feedback from ced route', (done) => {
    request(app)
    .get(api_path.user_feedback)
    .set('Authorization', '4142134awfdsfaef2q3q234dfzSdfAiocvnhvpi113135knuoa')
    .then((response) => {
        var jsonResponse = JSON.parse(response.text);
        console.log("testing for--------------------- " + jsonResponse.limit);
        expect(jsonResponse.limit).toEqual(5);
        done();
    });
});




// Happy cases

// Request test cases
// 1. check count
// 2. check limit
// 3. check next page
// 4. check previous page
// Feedback test cases
// 5. check attributes datatypes

// Sad cases

// 1. wrong authorization
// 2. wrong url paths
// 3. wrong page numbers

// this test case gets list of cities and
// passes the test if the total count of 
// cities is greater than 10
// test('It should response the GET city', (done) => {
//     request(app).get('/city/').then((response) => {
//      console.log("response-----------",JSON.parse(response.text).count);
//         expect(JSON.parse(response.text).count).toBeGreaterThan(10);
//         done();
//     });
// });