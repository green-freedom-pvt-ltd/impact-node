/*
This file is responsible for all db connections 

*/

const pg = require('pg');
const { Pool, Client } = require('pg');

var environment = process.env.ENV;
var config = require('config');

var dbConfig = config.get('Customer.dbConfig');
// console.log('printing dbConfig --------', dbConfig);



const pool = new Pool(dbConfig);


const connect = () => {
	console.log("this is " + environment + " environments");
  pool.query('', (err, result) => {
    // console.log(err, result.rows);
    // if(process.env.ENV){
    // }
  });
};


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