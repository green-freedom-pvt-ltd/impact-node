const routes = require('express').Router();
const Runs = require('../../controllers/runs/runController');
const Locations = require('../../controllers/runs/runLocationController');
const Feedback = require('../../controllers/FeedbackController');
const League = require('../../controllers/leagueController');
const Team = require('../../controllers/teamController');
const Employee = require('../../controllers/employeeController');
const User =require('../../controllers/user/index');
// var schedule = require('node-schedule');


routes.get('/userFeedback',Feedback.getFeedback);
routes.get('/runs',Runs.getRuns);
routes.put('/runs',Runs.updateRun);
routes.get('/impactleague', League.getLeague);
routes.get('/teams', Team.getTeams);
routes.get('/employeelist', Employee.getEmployeeList);
routes.get('/runLocation', Locations.getRunLocations);
routes.get('/users', User.getActualUserData);



// var j = schedule.scheduleJob('* * * * *', function(){
//     routes.get('/users', User.getActualUserData);
//     console.log('The world is going to end today.');
//   });



module.exports = routes;

