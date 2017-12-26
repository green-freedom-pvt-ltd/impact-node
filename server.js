const express = require('express');
const db = require('./db/index');
const logger = require('./logger');

db.connect();


const app=express();


app.get('/', (req, res) => res.send("Welcome to Node Postgres Express POC !!"))

app.get('/causes', (req, res, next) => db.getCauses((causes, err) => {
	if(causes){
		logger.loginto('inside if cause');
		return next(causes);
	};
	logger.loginto('exiting get cause');
}));


logger.loginto('trying this logger');


const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log('listening on port '+ port));