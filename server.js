// import { error } from 'util';

const express = require('express');
const db = require('./db/index');
const logger = require('./logger');
const City = require('./controllers/cityController');


db.connect();


const app = express();


app.get('/', (req, res) => res.send("Welcome to Node Postgres Express POC !!"))

app.get('/causes', (req, res, next) => db.getCauses((causes, err) => {
	logger.debug('entering get cause');
	if (causes) {
		logger.debug('inside if cause');
		return next(causes);
	};
}));


app.get('/city', City.getCities);
app.post('/city',City.createCity);
app.get('/city/:id',City.getParticularCity);
app.delete('/city/:id',City.destroyCity);

// app.get('/city', (req, res, next) =>  getCity.insertCity((city,err)=>{

// 	console.log(city);
// 	if (city) {
// 		return next(city);
// 	}
// 	else{
// 		return err;
// 	};
// }));



// var Sequelize = require("sequelize");
// var environment = process.env.ENV;
// var config = require('config');
// // var CityController = require('./controller');
// var sequilizeConfig = config.get('Customer.sequilize');
// var dbConfig = config.get('Customer.dbConfig');

// var sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
//   host: dbConfig.host,
//   dialect: sequilizeConfig.dialect,
//   pool: sequilizeConfig.pool,
// });
// var getCity = require('./controllers/getCities');








// console.log('cities',city);
// return next(city);
// logger.debug('entering get cause');
// if(causes){
// 	logger.debug('inside if cause');
// 	return next(causes);
// };



logger.info('inside server');

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('listening on port ' + port));