/*jshint esversion: 6 */

const request = require('supertest');
const app = require('../server');
var api_path={
    runs : '/ced/v0/runs/',
    runsLocation : '/ced/v0/runLocation/',
    user_feedback : '/ced/v0/userFeedback/',
    leagues : '/ced/v0/leagues/',
    teams : '/ced/v0/teams/',
    employee : '/ced/v0/employee/',
};
var _ = require('underscore');


// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++     REQUEST 
// check the response code to be 200

var api_keys = _.keys(api_path);

for (var i = api_keys.length - 1; i >= 0; i--) {
    console.log('api_path----------',api_path[api_keys[i]]);
    var api_path_location = api_path[api_keys[i]];
    test('check the response code to be 200 for ' + api_keys[i] +" with endpoint " +api_path_location, (done) => {
        request(app)
        .get(api_path_location)
        .set('Authorization', '4142134awfdsfaef2q3q234dfzSdfAiocvnhvpi113135knuoa')
        .then((response) => {
            expect(response.statusCode).toBe(200);
            done();
        });
    });
}



// ================================================ HAPPY CASES ================================================

// --------------------------------------------------------------------------------- check count
// check api count greater than 200
test('check api count greater than 200', (done) => {
    request(app)
    .get(api_path.user_feedback)
    .set('Authorization', '4142134awfdsfaef2q3q234dfzSdfAiocvnhvpi113135knuoa')
    .then((response) => {
        var jsonResponse = JSON.parse(response.text);
        // console.log("testing for--------------------- " + jsonResponse.count);
        expect(jsonResponse.count).toBeGreaterThan(200);
        done();
    });
});

// --------------------------------------------------------------------------------- check limit
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

// --------------------------------------------------------------------------------- check next page
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


// --------------------------------------------------------------------------------- check previous page
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

// ================================================ SAD CASES ================================================


// --------------------------------------------------------------------------------- check wrong auth
// check the response code to be 401
test('check the response code to be 401', (done) => {
    request(app)
    .get(api_path.user_feedback)
    .set('Authorization', '4142134awpi113135knuoa')
    .then((response) => {
        expect(response.statusCode).toBe(401);
        done();
    });
});

// --------------------------------------------------------------------------------- check without auth headers
// check the response code to be 400
test('check the response code to be 400', (done) => {
    request(app)
    .get(api_path.user_feedback)
    .then((response) => {
        expect(response.statusCode).toBe(400);
        done();
    });
});


// X-O-X-O-X-O-X-O-X-O-X-O-X-O-X-O-X-O-X-O-X-O-X-O-X-O-X-O-X-O-X-O-X-O-X-O-X-O-X-O-X-O-X-O-X-O-X-O-X-O-X-O-X-O-X-O-X-O-X




// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++     USER FEEDBACK  


// ================================================ HAPPY CASES ================================================

// --------------------------------------------------------------------------------- check filter parameters
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


// --------------------------------------------------------------------------------- check filter options
// check api response on valid fields and valid values with filter options
test('test filter options "lt" less than ', (done) => {
    request(app)
    .get(api_path.user_feedback+'?user_id_id.lt=79')
    .set('Authorization', '4142134awfdsfaef2q3q234dfzSdfAiocvnhvpi113135knuoa')
    .then((response) => {
         // console.log("Testing...",response.statusCode);
         expect(response.statusCode).toBe(200);
        done();
    });
});

test('test filter options "lte" less than equal to ', (done) => {
    request(app)
    .get(api_path.user_feedback+'?user_id_id.lte=79')
    .set('Authorization', '4142134awfdsfaef2q3q234dfzSdfAiocvnhvpi113135knuoa')
    .then((response) => {
         // console.log("Testing...",response.statusCode);
         expect(response.statusCode).toBe(200);
        done();
    });
});

test('test filter options "gt" greater than ', (done) => {
    request(app)
    .get(api_path.user_feedback+'?user_id_id.gt=79')
    .set('Authorization', '4142134awfdsfaef2q3q234dfzSdfAiocvnhvpi113135knuoa')
    .then((response) => {
         // console.log("Testing...",response.statusCode);
         expect(response.statusCode).toBe(200);
        done();
    });
});


test('test filter options "gte" greater than equal to ', (done) => {
    request(app)
    .get(api_path.user_feedback+'?user_id_id.gte=79')
    .set('Authorization', '4142134awfdsfaef2q3q234dfzSdfAiocvnhvpi113135knuoa')
    .then((response) => {
         // console.log("Testing...",response.statusCode);
         expect(response.statusCode).toBe(200);
        done();
    });
});




// --------------------------------------------------------------------------------- check filter parameters
// 6. check api response on valid fields
test('check api response on two valid field e.g. user_id and is_chat', (done) => {
    request(app)
    .get(api_path.user_feedback+'?user_id_id=1213&is_chat=true')
    .set('Authorization', '4142134awfdsfaef2q3q234dfzSdfAiocvnhvpi113135knuoa')
    .then((response) => {
         // console.log("Testing for multiple fields...",response.statusCode);
         var jsonResponse = JSON.parse(response.text);
         // console.log("Viewing Json response--------------------- " + jsonResponse.results);
         expect(response.statusCode).toBe(200);
        done();
    });
});


// ================================================ SAD CASES ================================================


// --------------------------------------------------------------------------------- check wrong filter values
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


// --------------------------------------------------------------------------------- check wrong filter values
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



// X-O-X-O-X-O-X-O-X-O-X-O-X-O-X-O-X-O-X-O-X-O-X-O-X-O-X-O-X-O-X-O-X-O-X-O-X-O-X-O-X-O-X-O-X-O-X-O-X-O-X-O-X-O-X-O-X-O-X




