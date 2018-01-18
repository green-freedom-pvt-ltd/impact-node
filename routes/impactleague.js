const routes = require('express').Router();
const logger = require('../logger');
const causedb = require('../db/cause');
const League = require('../controllers/leagueController');


// these are the routes for league
routes.get('/', League.getLeague);
routes.get('/:id', League.getLeague);
//routes.get('/auth', League.authenticate);


module.exports = routes;