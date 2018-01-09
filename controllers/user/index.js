// import { json } from "../../../../.cache/typescript/2.6/node_modules/@types/express";



var Sequelize = require("sequelize");
var config = require('config');
var sequilizeConfig = config.get('Customer.sequilize');
var dbConfig = config.get('Customer.dbConfig');
const logger = require('../../logger');
const pagination = config.get('Customer.pagination');

var sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
  host: dbConfig.host,
  dialect: sequilizeConfig.dialect,
  pool: sequilizeConfig.pool,
});
const User = sequelize.import("../../models/share_api_users");
const UserToken = sequelize.import("../../models/oauth2_provider_accesstoken");
const baseUrl = 'http://localhost:3000/user';

// getPagination function is used to add pagination in API response. It takes response object,
//current page from query url, base url and limit
function getPagination(objectResponse, currPage, url, limit) {

  const totalPage = Math.ceil(parseInt(objectResponse.count) / limit);

  console.log("Hello WORLD.........", objectResponse, currPage, totalPage, url, limit);
  objectResponse = JSON.stringify(objectResponse);
  //  console.log(JSON.stringify(cities));
  objectResponse = JSON.parse(objectResponse);

  objectResponse.next = currPage == totalPage ? null : `${url}/?page=${currPage + 1}`;
  objectResponse.prev = currPage - 1 <= 0 ? null : `${url}/?page=${currPage - 1}`;
  return objectResponse;
}

//get Offset function used to get page and offset value from url
function getOffset(urlQuery, limit) {
  var page = parseInt(urlQuery.page) || 1;
  var offset = page == 1 ? 0 : ((page - 1) * limit);
  return {
    page: page,
    offset: offset
  }
}

var userModel = {

  //GET all users
  getUsers(req, res) {
    var limit = pagination.SMALL; // Set limit to SMALL(5)
    var getPageOffset = getOffset(req.query, limit); //get Offset function returns page and offset value
    var page = getPageOffset.page; 
    var offset = getPageOffset.offset;

    return User.findAndCountAll({ offset: offset, limit: limit })
      .then(users => {
        console.log("RESPONSE.........",users.rows.length);
    // getPagination function is used to add pagination in API response
        res.json(getPagination(users, page, baseUrl,limit)); 
      });
  },


  // this api takes auth token from the headers and verifys it
  // if user exists it returns the user object
  authenticate(req, res) {
    const token = req.headers.authorization;
    var parts = token.split(' ')
    UserToken.findAndCountAll({
      where: { token: parts[1] }
    })
      .then(userstoken => {
        // console.log("inside user auth get user..............",userstoken.rows[0].id);      
        User.findAndCountAll({ where: { user_id: userstoken.rows[0].id } })
          .then(users => {
            res.json(users);
          });
      });
  },

};


module.exports = userModel;