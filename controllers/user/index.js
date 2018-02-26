// import { json } from "../../../../.cache/typescript/2.6/node_modules/@types/express";



var config = require('config');
const logger = require('../../logger');
const db = require('../../db/index');
const pagin = require('../../middleware/pagination');
const env = require('../../config/settings');
const paginconfig = env.pagination;
var Sequelize = require("sequelize");
var sequelize = db.sequelize;


const filterList = [
  ['user_id', 'integer'],
  ['first_name', 'string'],
  ['last_name', 'string'],
  ['email', 'string']
];


var actualUserData = "SELECT u.user_id, o.token, u.first_name, u.last_name, u.gender_user, u.email_id, u.phone_number,"+
"u.address, u.locality_user, u.city, u.state, u.country,sum(r.distance) AS total_distance, sum(r.run_amount) AS total_amount,"+
"u.social_thumb, u.birthday, u.cheat_flag, u.body_height, u.body_weight FROM public.share_api_users u "+
"LEFT JOIN public.oauth2_provider_accesstoken o ON u.user_id = o.user_id "+
"LEFT JOIN public.share_api_runs r ON o.user_id = r.user_id_id where o.token='271c0a26ce3f8a1ba32c4343f3836d5bb0544a93' "+
"GROUP BY u.user_id, o.token, u.first_name, u.last_name, u.gender_user, u.email_id, u.phone_number,u.address;"


var userModel = {

  //GET all users
  getUsers(req, res) {

    var urlQuery = req.query;
    var whereQuery = pagin.createQuery(urlQuery, filterList);
    console.log("paginconfig------------------", paginconfig.SMALL);
    return db.users.findAndCountAll({
      where: whereQuery,
      limit: paginconfig.SMALL,
      offset: (urlQuery.page == 0 || (isNaN(urlQuery.page)) ? 1 : urlQuery.page == 1) ? 0 : ((urlQuery.page - 1) * paginconfig.SMALL)
    })
      .then(user => {
        res.json(pagin.getPagination(user, req, paginconfig.SMALL));
      })

  },

  //get all feedback for particular users and filters
  getActualUserData(req, res) {
    var urlQuery = req.query;
    
      return sequelize.query(actualUserData).spread(function (results, metadata) {
        // console.log("RESULTS......", results.length);
        var onverall = {};
        onverall.count = results.length;
        onverall.rows = results;
        res.json(onverall);
      }).catch(err => {
        res.status(500).send({ error: 'Something failed! Contact the admin.' })
        throw new Error(err);
      })
    

  },
  

  getLeaderboard(req, res) {

    var urlQuery = req.query;
    var whereQuery = pagin.createQuery(urlQuery, filterList);
    console.log("paginconfig------------------", paginconfig.SMALL);
    return db.leaderboard.findAndCountAll({
      where: whereQuery,
      limit: paginconfig.SMALL,
      offset: (urlQuery.page == 0 || (isNaN(urlQuery.page)) ? 1 : urlQuery.page == 1) ? 0 : ((urlQuery.page - 1) * paginconfig.SMALL)
    })
      .then(user => {
        res.json(pagin.getPagination(user, req, paginconfig.SMALL));
      })

  },

}


module.exports = userModel;