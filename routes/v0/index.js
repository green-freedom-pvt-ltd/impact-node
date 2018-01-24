const routes = require('express').Router();

const Runs = require('../../controllers/runs/runController');
const Locations = require('../../controllers/runs/runLocationController');
const Feedback = require('../../controllers/FeedbackController');
const League = require('../../controllers/leagueController');
const Team = require('../../controllers/teamController');
const Employee = require('../../controllers/employeeController');


routes.get('/userFeedback',Feedback.getFeedback);
routes.get('/runs',Runs.getRuns);
routes.get('/leagues', League.getLeague);
routes.get('/teams', Team.getTeams);
routes.get('/employee', Employee.getEmployeeList);
routes.get('/runLocation', Locations.getRunLocations);



module.exports = routes;
