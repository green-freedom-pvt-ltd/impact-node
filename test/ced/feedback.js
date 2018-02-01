/*jshint esversion: 6 */


const request = require('supertest');
const app = require('../../server')
var api_path={
    user_feedback : '/ced/v0/userFeedback/',
    runs : '/ced/v0/runs/',
}


// check the response code to be 401
// 1. wrong authorization
test('check the response code to be 401', (done) => {
    request(app)
    .get(api_path.runs)
    .set('Authorization', '4142134awpi113135knuoa')
    .then((response) => {
        // var jsonResponse = JSON.parse(response);
        console.log("jsonResponse   -------------------- ", response.statusCode, response.status);
        expect(response.status).toBe(401);
        done();
    });
});


// check the response code to be 400
// 2. without auth headers
test('check the response code to be 400', (done) => {
    request(app)
    .get(api_path.user_feedback)
    .then((response) => {
        expect(response.statusCode).toBe(400);
        done();
    });
});


// 3. check api response on valid fields and invalid values 

test('check api response with invalid data e.g. user_id_id=abcd', (done) => {
    request(app)
    .get(api_path.user_feedback+'?user_id_id=abcd')
    .set('Authorization', '4142134awfdsfaef2q3q234dfzSdfAiocvnhvpi113135knuoa')
    .then((response) => {
         // console.log("Testing with invalid data...",response.statusCode);
         expect(response.statusCode).toBe(400);
        done();
    });
});

// 4. check api response on valid fields and invalid values 

test('check api response with invalid data e.g. user_id_id=abcd&is_chat=true', (done) => {
    request(app)
    .get(api_path.user_feedback+'?user_id_id=abcd&is_chat=true')
    .set('Authorization', '4142134awfdsfaef2q3q234dfzSdfAiocvnhvpi113135knuoa')
    .then((response) => {
         // console.log("Testing with invalid data...",response.error.text);
       
         expect(JSON.parse(response.error.text)).toEqual({"error":"Value of the atrribute user_id_id is supposed to be integer"});
        done();
    });
});


