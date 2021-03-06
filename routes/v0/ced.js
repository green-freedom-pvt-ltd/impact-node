const routes = require('express').Router();
const Runs = require('../../controllers/runs/runController');
const Locations = require('../../controllers/runs/runLocationController');
const Feedback = require('../../controllers/FeedbackController');
const League = require('../../controllers/league/index');
const Team = require('../../controllers/teamController');
const Employee = require('../../controllers/employeeController');
const User =require('../../controllers/user/index');



routes.get('/userFeedback',Feedback.getFeedback);
routes.get('/runs',Runs.getRuns);
routes.get('/impactleague', League.getLeague);
routes.get('/teams', League.getTeams);
routes.get('/employeelist', Employee.getEmployeeList);
routes.get('/runLocation', Locations.getRunLocations);
// routes.get('/users', User.getActualUserData);
// routes.post('/teams',League.createTeams);



module.exports = routes;

