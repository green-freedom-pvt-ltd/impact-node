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



// trying logger implementation
// const winston = require('winston');
// const fs = require('fs');
// const env = process.env.NODE_ENV || 'development';
// const logDir = 'log';
// // Create the log directory if it does not exist
// if (!fs.existsSync(logDir)) {
//   fs.mkdirSync(logDir);
// }


// const tsFormat = () => (new Date()).toLocaleTimeString();

// const logger = new (winston.Logger)({
//   transports: [
//     // colorize the output to the console
//     new (winston.transports.Console)({
//       timestamp: tsFormat,
//       colorize: true,
//       level: 'info'
//     }),
//     new (winston.transports.File)({
//       filename: `${logDir}/results.log`,
//       timestamp: tsFormat,
//       level: env === 'development' ? 'debug' : 'info'
//     })
//   ]
// });


logger.info('inside server');
logger.warn('inside server 2');
logger.debug('inside server 3');




const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log('listening on port '+ port));