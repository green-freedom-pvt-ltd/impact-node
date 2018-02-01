/*jshint esversion: 6 */

const request = require('supertest');
const app = require('../server')
var api_path={
    user_feedback : '/ced/v0/userFeedback/',
    runs : '/ced/v0/runs/',
}

// this test case tests if the response code for
// get request is 200


// check the response code to be 200
test('check the response code to be 200', (done) => {
    request(app)
    .get(api_path.runs)
    .set('Authorization', '4142134awfdsfaef2q3q234dfzSdfAiocvnhvpi113135knuoa')
    .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
    });
});

// Happy cases

// 1. check count
// check api count greater than 200
test('check api count greater than 200', (done) => {
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
test('check api limit to be equal to 5', (done) => {
    request(app)
    .get(api_path.user_feedback)
    .set('Authorization', '4142134awfdsfaef2q3q234dfzSdfAiocvnhvpi113135knuoa')
    .then((response) => {
        var jsonResponse = JSON.parse(response.text);
        // console.log("testing for--------------------- " + jsonResponse.limit);
        expect(jsonResponse.limit).toEqual(5);
        done();
    });
});

// 3. check next page
// check api next page
test('check api next page', (done) => {
    request(app)
    .get(api_path.user_feedback)
    .set('Authorization', '4142134awfdsfaef2q3q234dfzSdfAiocvnhvpi113135knuoa')
    .then((response) => {
        var jsonResponse = JSON.parse(response.text);
        // console.log("testing for--------------------- " + jsonResponse.next);
        expect(jsonResponse.next).not.toBeNull();
        done();
    });
});



// 4. check previous page
// check api previous page
test('check api previous page', (done) => {
    request(app)
    .get(api_path.user_feedback+'?page=2/')
    .set('Authorization', '4142134awfdsfaef2q3q234dfzSdfAiocvnhvpi113135knuoa')
    .then((response) => {
        var jsonResponse = JSON.parse(response.text);
        // console.log("testing for--------------------- " + jsonResponse.previous);
        expect(jsonResponse.previous).not.toBeNull();
        done();
    });
});


// 5. check api response on valid fields and valid values

test('check api response on valid field e.g. user_id_id', (done) => {
    request(app)
    .get(api_path.user_feedback+'?user_id_id=1213')
    .set('Authorization', '4142134awfdsfaef2q3q234dfzSdfAiocvnhvpi113135knuoa')
    .then((response) => {
         // console.log("Testing...",response.statusCode);
         expect(response.statusCode).toBe(200);
        done();
    });
});

// 6. check api response on valid fields

test('check api response on two valid field e.g. user_id and is_chat', (done) => {
    request(app)
    .get(api_path.user_feedback+'?user_id_id=1213&is_chat=true')
    .set('Authorization', '4142134awfdsfaef2q3q234dfzSdfAiocvnhvpi113135knuoa')
    .then((response) => {
         // console.log("Testing for multiple fields...",response.statusCode);
         var jsonResponse = JSON.parse(response.text);
         // // console.log("Viewing Json response--------------------- " + jsonResponse.results);
         expect(response.statusCode).toBe(200);
        done();
    });
});







// Sad cases



// check the response code to be 401
// 1. wrong authorization
test('check the response code to be 401', (done) => {
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
         // // console.log("Testing with invalid data...",response.statusCode);
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



