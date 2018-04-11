const {getRuns,postRun} = require('./runController');
const {getRunLocations} = require('./runLocationController');


var RunAPIs = {};

RunAPIs.getRuns = getRuns;
RunAPIs.postRun = postRun;
RunAPIs.getRunLocations = getRunLocations;

module.exports = RunAPIs;