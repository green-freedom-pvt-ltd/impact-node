const routes = require('express').Router();
const logger = require('../logger');
const causedb = require('../db/cause');
// const City = require('../controllers/cityController');

// include all routes for city
routes.use('/city', require('./city'))
routes.use('/user', require('./user'))
routes.use('/runLocation', require('./runs/runLocation'))
routes.use('/runs', require('./runs/runs'));
routes.use('/userFeedback', require('./userFeedback'));
routes.use('/impactleague', require('./impactleague'));
routes.use('/teams', require('./team'));
routes.use('/employeelist', require('./employee'));

// landing page route
routes.get('/', (req, res) => {
  res.status(200).json({ message: 'Connected!' });
});


// get cause from database via query
routes.get('/causes', (req, res, next) => causedb.getCauses((causes, err) => {
	logger.debug('entering get cause');
	if (causes) {
		logger.debug('inside if cause');
		return next(causes);
	};
}));



module.exports = routes;