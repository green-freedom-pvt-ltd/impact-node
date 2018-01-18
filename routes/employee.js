const routes = require('express').Router();
const logger = require('../logger');
const causedb = require('../db/cause');
const Employee = require('../controllers/employeeController');


// these are the routes for employee
routes.get('/', Employee.getEmployeeList);
routes.get('/:id', Employee.getEmployeeList);
 //routes.get('/auth', Team.authenticate);


module.exports = routes;