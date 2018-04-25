'use strict'

/*
This file is responsible for managing all db connections 
1. establish connection for every request
2. cache connections for users
3. manage database pooling

*/

const { Pool, Client } = require('pg');
var environment = process.env.ENV;
var config = require('config');
var Sequelize = require("sequelize");
var sequilizeConfig = config.get('Customer.sequilize');
const pool = new Pool(sequilizeConfig);



var sequelize = new Sequelize(sequilizeConfig.database, sequilizeConfig.user, sequilizeConfig.password, {
  host: sequilizeConfig.host,
  dialect: sequilizeConfig.dialect,
  pool: sequilizeConfig.pool,
  //logging: false
});


const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('../models/share_api_users.js')(sequelize, Sequelize);
db.usersToken = require('../models/oauth2_provider_accesstoken.js')(sequelize, Sequelize);
db.city = require('../models/share_api_city.js')(sequelize, Sequelize);
db.runLocation = require('../models/share_api_runlocations.js')(sequelize, Sequelize);
db.runs = require('../models/share_api_runs.js')(sequelize, Sequelize);
db.feedback = require('../models/share_api_userfeedback.js')(sequelize, Sequelize);
db.impactLeague = require('../models/share_api_impactleague')(sequelize, Sequelize);
db.team = require('../models/share_api_team')(sequelize, Sequelize);
db.employee = require('../models/share_api_employee')(sequelize, Sequelize);
db.leaderboard = require('../models/share_api_leaderboard')(sequelize, Sequelize);
db.leagueleaderboardteamleaderboard = require('../models/share_api_leagueleaderboard')(sequelize, Sequelize);
db.teamleaderboard = require('../models/share_api_teamleaderboard')(sequelize, Sequelize);
db.causes = require('../models/share_api_causes')(sequelize, Sequelize);
db.sponsors = require('../models/share_api_sponsors')(sequelize, Sequelize);
db.feeds = require('../models/share_api_messagecenter')(sequelize, Sequelize);
db.faqs = require('../models/share_api_faq')(sequelize, Sequelize);
db.fraudster = require('../models/share_api_fraudsters')(sequelize, Sequelize);
db.runConfig = require('../models/share_api_runconfigurationparams')(sequelize, Sequelize);
db.CauseSponsor = require('../models/share_api_causes_sponsors')(sequelize,Sequelize);
db.company = require('../models/share_api_company')(sequelize,Sequelize);

//Relation 
// db.CauseSponsor.belongsTo(db.causes,{foreignKey:'sponsors_id'});
// db.CauseSponsor.belongsTo(db.sponsors,{ foreignKey:'causes_id'});

// db.causes.hasMany(db.CauseSponsor,{ foreignKey:'causes_id'});
// db.sponsors.hasMany(db.CauseSponsor,{ foreignKey:'sponsors_id'});

db.causes.belongsToMany(db.sponsors, { through: db.CauseSponsor , foreignKey:'causes_id'});
db.sponsors.belongsToMany(db.causes, {through: db.CauseSponsor , foreignKey:'sponsors_id'});

db.leaderboard.belongsTo(db.users, { foreignKey: 'user_id' });
db.teamleaderboard.belongsTo(db.users, { foreignKey: 'user_id' });

db.runs.belongsTo(db.causes,{foreignKey: 'cause_run_title_id'});




// this connects the application to the database
// and all transactions happen after that
// in the end the connection is closed
const connect = () => {
  console.log("this is " + environment + " environments");
  pool.query('', (err, result) => {
  });
};

const query = (text, params, callback) => {
  return pool.query(text, params, callback);
}

module.exports = db;