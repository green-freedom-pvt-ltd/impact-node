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
const baseUrl = 'http://localhost:3000/users';



var userModel = {
  

  //GET all cities
  getUsers(req, res) {
    var page = parseInt(req.query.page) || 1;
    var limit = 10;
    
    var offset = page ==1?0:((page-1) * limit);
    console.log("OFFSET..............",offset);
    return User.findAndCountAll({offset:offset,limit:limit})
    .then(users => {
      const pageCount = Math.ceil(parseInt(users.count)/limit);
    console.log("pageCount..............",pageCount);      
      var cities = JSON.stringify(users);
     //  console.log(JSON.stringify(cities));
      cities = JSON.parse(cities);
      cities.next =page == pageCount?null:`${baseUrl}/?page=${page+1}`;
      cities.prev = page-1<=0?null:`${baseUrl}/?page=${page-1}`;
      res.json(cities);
         
      });
  },

};


module.exports = userModel;