const {getTeamLeaderboard}= require('./getTeamLeaderboard');
const {getLeagueLeaderboard} = require('./getLeagueleaderboard');
const {getLeague,getTeams,createTeams,joinTeam,exitTeams} = require('./league');

var league_all={};

league_all.getTeamLeaderboard =getTeamLeaderboard;
league_all.getLeagueLeaderboard = getLeagueLeaderboard;
league_all.getLeague = getLeague;
league_all.getTeams = getTeams;
league_all.createTeams = createTeams;
league_all.joinTeam = joinTeam;
league_all.exitTeams = exitTeams;


module.exports =  league_all;