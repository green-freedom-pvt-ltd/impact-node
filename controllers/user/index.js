// import { json } from "../../../../.cache/typescript/2.6/node_modules/@types/express";



var Sequelize = require("sequelize");
var config = require('config');
var sequilizeConfig = config.get('Customer.sequilize');
var dbConfig = config.get('Customer.dbConfig');
const logger = require('../../logger');

var sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
  host: dbConfig.host,
  dialect: sequilizeConfig.dialect,
  pool: sequilizeConfig.pool,
});
const User = sequelize.import("../../models/share_api_users");
const UserToken = sequelize.import("../../models/oauth2_provider_accesstoken");
const baseUrl = 'http://localhost:3000/users';



var userModel = {

  //GET all users
  getUsers(req, res) {
    return User.findAndCountAll({offset:0,limit:2})
    .then(users => {
      // users = JSON.parse(users);
      console.log("inside user get..............",users.rows);      
      res.json(users);
         
      });
  },

  authenticate(req, res){
    const token = req.headers.authorization;
    var parts = token.split(' ')
    // console.log("inside user auth..............",token,parts);      
    UserToken.findAndCountAll({
        where: { token: parts[1] }
        // offset:0,limit:2
      })
    .then(userstoken => {
      // users = JSON.parse(users);
      // console.log("inside user get..............",users.rows); 
      console.log("inside user auth get user..............",userstoken.rows[0].id);      
      User.findAndCountAll({where: { user_id: userstoken.rows[0].id }})
      .then(users => {
        // users = JSON.parse(users);
        res.json(users);
        });     
      // res.json(userstoken);
         
      });
  },

};


module.exports = userModel;