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

// Happy cases

// 1. check count
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


// 2. check limit
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

// 3. check next page
// check api next page
test('get user feedback from ced route', (done) => {
    request(app)
    .get(api_path.user_feedback)
    .set('Authorization', '4142134awfdsfaef2q3q234dfzSdfAiocvnhvpi113135knuoa')
    .then((response) => {
        var jsonResponse = JSON.parse(response.text);
        console.log("testing for--------------------- " + jsonResponse.next);
        expect(jsonResponse.next).not.toBeNull();
        done();
    });
});



// 4. check previous page
// check api previous page
test('get user feedback from ced route', (done) => {
    request(app)
    .get(api_path.user_feedback+'?page=2/')
    .set('Authorization', '4142134awfdsfaef2q3q234dfzSdfAiocvnhvpi113135knuoa')
    .then((response) => {
        var jsonResponse = JSON.parse(response.text);
        console.log("testing for--------------------- " + jsonResponse.previous);
        expect(jsonResponse.previous).not.toBeNull();
        done();
    });
});





// 5. check attributes datatypes

// Sad cases



// check the response code to be 401
// 1. wrong authorization
test('get user feedback from ced route', (done) => {
    request(app)
    .get(api_path.user_feedback)
    .set('Authorization', '4142134awpi113135knuoa')
    .then((response) => {
        expect(response.statusCode).toBe(401);
        done();
    });
});


// check the response code to be 400
// 2. without auth headers
test('get user feedback from ced route', (done) => {
    request(app)
    .get(api_path.user_feedback)
    .then((response) => {
        expect(response.statusCode).toBe(400);
        done();
    });
});


// 3. wrong url paths
