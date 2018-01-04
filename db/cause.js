// This file is responsible for all queries related to cause

const { Pool, Client } = require('pg');
var environment = process.env.ENV;
var config = require('config');
var dbConfig = config.get('Customer.dbConfig');
const pool = new Pool(dbConfig);





// this db call gets all causes
const getCauses = (cb) => {
  pool.query('select * from share_api_causes', (err, result) => {
    return cb(JSON.stringify(result.rows, null, 2));
    // console.log(err, result.rows);
  });
}




module.exports = {
  getCauses
};
