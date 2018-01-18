const routes = require('express').Router();
const logger = require('../logger');
const causedb = require('../db/cause');
const Team = require('../controllers/teamController');


// these are the routes for team
routes.get('/', Team.getTeams);
routes.get('/:id', Team.getTeams);
//routes.get('/auth', Team.authenticate);


module.exports = routes;