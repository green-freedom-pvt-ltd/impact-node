const {getFeeds} = require('./feeds');
const {getServerTime} = require('./serverTime');
const {getFaqs} = require('./faq');

var otherApis = {};

otherApis.getFeeds = getFeeds;
otherApis.getServerTime = getServerTime;
otherApis.getFaqs = getFaqs;

module.exports = otherApis;