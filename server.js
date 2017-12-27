require('newrelic');
const express = require('express');
const db = require('./db/index');
const logger = require('./logger');
db.connect();


const app=express();


app.get('/', (req, res) => res.send("Welcome to Node Postgres Express POC !!"))

app.get('/causes', (req, res, next) => db.getCauses((causes, err) => {
	logger.debug('entering get cause');
	if(causes){
		logger.debug('inside if cause');
		return next(causes);
	};
}));


logger.info('inside server');




const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log('listening on port '+ port));