const routes = require('express').Router();

const causedb = require('../../db/cause');
const Runs = require('../../controllers/runs/runLocationController');


// these are the routes for city
routes.get('/', Runs.getRunLocations);
routes.get('/:run_id', Runs.getRunLocations);



module.exports = routes;