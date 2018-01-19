const routes = require('express').Router();
const Team = require('../controllers/teamController');


// these are the routes for team
routes.get('/', Team.getTeams);
routes.get('/:id', Team.getTeams);


module.exports = routes;