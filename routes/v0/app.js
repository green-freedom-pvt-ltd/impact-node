const routes = require('express').Router();

const Runs = require('../../controllers/runs/runController');
const Locations = require('../../controllers/runs/runLocationController');
const Feedback = require('../../controllers/FeedbackController');
const League = require('../../controllers/league/index');
const Team = require('../../controllers/teamController');
const Employee = require('../../controllers/employeeController');
const Leaderboard = require('../../controllers/leaderboard');
const User =require('../../controllers/user/index');
const NewLeaderboard =require('../../controllers/leaderboard/index');
const TeamLeaderboard =require('../../controllers/league/getTeamLeaderboard');
const LeagueLeaderboard =require('../../controllers/league/getLeagueleaderboard');


routes.get('/userFeedback',Feedback.getFeedback);
routes.get('/runs',Runs.getRuns);
routes.post('/runs',Runs.postRun);
// routes.get('/impactleague', League.getLeague);
routes.get('/teams', League.getTeams);
// routes.get('/employee', Employee.getEmployeeList);
routes.get('/runLocation', Locations.getRunLocations);
routes.get('/leaderboard',NewLeaderboard.getLeaderboard);
routes.post('/teams',League.createTeams);
routes.post('/jointeam',League.joinTeam);
routes.post('/exitteam',League.exitTeams);


routes.get('/users', User.getActualUserData);
routes.get('/userleaderboard', User.getLeaderboard);
routes.get('/teamleaderboard', League.getTeamLeaderboard);
routes.get('/teamboard', League.getLeagueLeaderboard);

module.exports = routes;

