const {getFeeds} = require('./feeds');
const {getServerTime} = require('./serverTime');

var otherApis = {};

otherApis.getFeeds = getFeeds;
otherApis.getServerTime = getServerTime;

module.exports = otherApis;