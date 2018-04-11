const {getRuns,postRun} = require('./runController');
const {getRunLocations, postRunLocation} = require('./runLocationController');


var RunAPIs = {};

RunAPIs.getRuns = getRuns;
RunAPIs.postRun = postRun;
RunAPIs.getRunLocations = getRunLocations;
RunAPIs.postRunLocation = postRunLocation;

module.exports = RunAPIs;