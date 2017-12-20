const pg = require('pg');

const { Pool, Client } = require('pg');
var environment = process.env.ENV;

const express = require('express')
const app = express();


const pool = new Pool({
  user: 'abhijeet',
  host: 'localhost',
  database: 'share_backend_dev_api',
  password: 'welcome@1',
  port: 5432,
});

const connect = () => {
  pool.query('', (err, result) => {
    // console.log(err, result.rows);
    // if(process.env.ENV){
    	console.log("this is " + environment + " environments")
    // }
  });
};


const getCauses = (cb) => {
  pool.query('select * from share_api_causes', (err, result) => {
    return cb(JSON.stringify(result.rows, null, 2));
    // console.log(err, result.rows);
  });
}


module.exports = {
  connect,
  getCauses
};