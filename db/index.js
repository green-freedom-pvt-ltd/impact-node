/*
This file is responsible for managing all db connections 
1. establish connection for every request
2. cache connections for users
3. manage database pooling

*/

const pg = require('pg');
const { Pool, Client } = require('pg');

var environment = process.env.ENV;
var config = require('config');

var dbConfig = config.get('Customer.dbConfig');

const pool = new Pool(dbConfig);


// this connects the application to the database
// and all transactions happen after that
// in the end the connection is closed
const connect = () => {
	console.log("this is " + environment + " environments");
  pool.query('', (err, result) => {
  });
};


// this db call gets all causes
const getCauses = (cb) => {
  pool.query('select * from share_api_causes', (err, result) => {
    return cb(JSON.stringify(result.rows, null, 2));
    // console.log(err, result.rows);
  });
}

const query = (text, params, callback) => {
    return pool.query(text, params, callback);
  }


module.exports = {
  connect,
  getCauses,
  query
};