const {getBadges,postBadges} = require('./badges');

let Profile ={};

Profile.getBadges = getBadges;
Profile.postBadges=postBadges;

module.exports = Profile;
