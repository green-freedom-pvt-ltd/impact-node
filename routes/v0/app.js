const routes = require('express').Router();

const Runs = require('../../controllers/runs/index');
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
const Causes = require('../../controllers/cause/index');
const OtherAPI = require('../../controllers/otherApi/index');



routes.get('/userFeedback',Feedback.getFeedback);
routes.post('/userFeedback',Feedback.postFeedback);

routes.get('/runs',Runs.getRuns);
routes.post('/runs',Runs.postRun);

// routes.get('/impactleague', League.getLeague);
routes.get('/teams', League.getTeams);
// routes.get('/employee', Employee.getEmployeeList);
routes.get('/runLocations', Runs.getRunLocations);
routes.post('/runLocations', Runs.postRunLocation);

routes.get('/leaderboard',NewLeaderboard.getLeaderboard);
routes.post('/teams',League.createTeams);
routes.post('/jointeam',League.joinTeam);
routes.post('/exitteam',League.exitTeams);


routes.get('/users', User.getActualUserData);
routes.get('/userleaderboard', User.getLeaderboard);
routes.get('/teamleaderboard', League.getTeamLeaderboard);
routes.get('/teamboard', League.getLeagueLeaderboard);
routes.get('/messageCenter', OtherAPI.getFeeds);
routes.get('/servertime', OtherAPI.getServerTime);
routes.get('/faq', OtherAPI.getFaqs);
routes.post('/fraudsters',OtherAPI.postFraudster);
routes.get('/runconfig',OtherAPI.getClientConfig);

module.exports = routes;

