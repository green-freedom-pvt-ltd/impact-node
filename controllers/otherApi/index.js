const {getFeeds} = require('./feeds');
const {getServerTime} = require('./serverTime');
const {getFaqs} = require('./faq');
const {postFraudster} = require('./fraudster');
const {getClientConfig} = require("./clientConfig");

var otherApis = {};

otherApis.getFeeds = getFeeds;
otherApis.getServerTime = getServerTime;
otherApis.getFaqs = getFaqs;
otherApis.postFraudster= postFraudster;
otherApis.getClientConfig = getClientConfig;

module.exports = otherApis;