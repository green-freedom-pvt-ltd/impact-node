const express = require('express')
const app = express()
const pg = require('pg');
const { Pool, Client } = require('pg');
var environment = process.env.ENV;

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(3000, () => console.log('Example app listening on port 3000!'))




const pool = new Pool({
  user: 'abhijeet',
  host: 'localhost',
  database: 'share_backend_dev_api',
  password: 'welcome@1',
  port: 5432,
});


pool.query('select * from share_api_causes', (err, result) => {
  // console.log(err, result.rows);
  // if(process.env.ENV){
  	console.log("this is " + environment + " environment")
	app.get('/causes', (req, res) => res.send(result.rows))
  // }
  pool.end()
});


pool.query('select * from share_api_causes', (err, result) => {
  	console.log("this is " + environment + " environment")
	app.get('/causes', (req, res) => res.send(result.rows))
  pool.end()
});