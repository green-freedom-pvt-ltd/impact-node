const routes = require('express').Router();
const logger = require('../logger');
const causedb = require('../db/cause');


routes.get('/', (req, res) => {
  res.status(200).json({ message: 'Connected!' });
});


routes.get('/causes', (req, res, next) => causedb.getCauses((causes, err) => {
	logger.debug('entering get cause');
	if (causes) {
		logger.debug('inside if cause');
		return next(causes);
	};
}));



module.exports = routes;