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
db.runLocation = require  ('../models/share_api_runlocations.js')(sequelize, Sequelize);
db.runs = require  ('../models/share_api_runs.js')(sequelize, Sequelize);
db.feedback = require  ('../models/share_api_userfeedback.js')(sequelize, Sequelize);
db.impactLeague =require ('../models/share_api_impactleague')(sequelize, Sequelize);
db.team = require ('../models/share_api_team')(sequelize, Sequelize);
db.employee =require ('../models/share_api_employee')(sequelize, Sequelize);


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