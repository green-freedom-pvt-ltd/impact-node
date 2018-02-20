const routes = require('express').Router();
const logger = require('../../logger');
const causedb = require('../../db/cause');
const Runs = require('../../controllers/runs/runController');


// these are the routes for city
routes.get('/', Runs.getRuns);
routes.get('/:run_id', Runs.getRuns);
routes.put('/', Runs.updateRun);


module.exports = routes;

