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
      console.log("inside user get..............",users.rows);      
      res.json(users);
         
      });
  },


// this api takes auth token from the headers and verifys it
// if user exists it returns the user object
  authenticate(req, res){
    const token = req.headers.authorization;
    var parts = token.split(' ')
    UserToken.findAndCountAll({
        where: { token: parts[1] }
      })
    .then(userstoken => {
      // console.log("inside user auth get user..............",userstoken.rows[0].id);      
      User.findAndCountAll({where: { user_id: userstoken.rows[0].id }})
      .then(users => {
        res.json(users);
        });     
      });
  },

};


module.exports = userModel;