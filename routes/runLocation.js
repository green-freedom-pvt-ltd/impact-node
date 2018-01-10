const routes = require('express').Router();
const logger = require('../logger');
const causedb = require('../db/cause');
const Runs = require('../controllers/runs/runLocationController');


// these are the routes for city
routes.get('/', Runs.getRuns);



module.exports = routes;