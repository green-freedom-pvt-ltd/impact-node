const routes = require('express').Router();
const logger = require('../logger');
const causedb = require('../db/cause');
// const City = require('../controllers/cityController');

// include all routes for city
routes.use('/ced/v0', require('./v0/ced'));
routes.use('/app/v0', require('./v0/app'));

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