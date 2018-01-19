const routes = require('express').Router();
const League = require('../controllers/leagueController');


// these are the routes for league
routes.get('/', League.getLeague);
routes.get('/:id', League.getLeague);


module.exports = routes;