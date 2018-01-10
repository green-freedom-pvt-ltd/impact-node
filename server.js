
require('newrelic');
const express = require('express');
const db = require('./db/index');
const authmw = require('./middleware/authenticate');
const causedb = require('./db/cause');
const logger = require('./logger');
const City = require('./controllers/cityController');
var bodyParser = require('body-parser');
const routes = require('./routes');

db.connect();


const app = express();


// 
app.use(bodyParser.urlencoded({
  extended: true
}));

// this middleware is for checking authentication for all requests
app.use('/', authmw());
app.use('/', routes);




// app.get('/', (req, res) => res.send("Welcome to Node Postgres Express POC !!"));

// app.get('/causes', (req, res, next) => causedb.getCauses((causes, err) => {
// 	logger.debug('entering get cause');
// 	if (causes) {
// 		logger.debug('inside if cause');
// 		return next(causes);
// 	};
// }));


app.get('/causespromise', (req, res, next) => res.send(db.getImportantData()));


logger.info('inside server');
// app.get('/city', City.getCities);
// app.post('/city',City.createCity);
// app.get('/city/:id',City.getParticularCity);
// app.delete('/city/:id',City.destroyCity);
// app.put('/city/:id',City.updateCity);

logger.info('inside server');

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('listening on port ' + port));