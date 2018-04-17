const {getRuns,postRun, updateRun} = require('./runController');
const {getRunLocations, postRunLocation} = require('./runLocationController');


var RunAPIs = {};

RunAPIs.getRuns = getRuns;
RunAPIs.postRun = postRun;
RunAPIs.updateRun = updateRun;
RunAPIs.getRunLocations = getRunLocations;
RunAPIs.postRunLocation = postRunLocation;

module.exports = RunAPIs;