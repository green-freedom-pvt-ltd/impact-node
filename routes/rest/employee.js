const routes = require('express').Router();
const Employee = require('../controllers/employeeController');


// these are the routes for employee
routes.get('/', Employee.getEmployeeList);
routes.get('/:id', Employee.getEmployeeList);


module.exports = routes;