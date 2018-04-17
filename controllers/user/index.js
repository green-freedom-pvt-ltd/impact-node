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


var actualUserData = "SELECT u.user_id, o.token, u.first_name, u.last_name, u.gender_user, u.email, u.phone_number," +
  "u.address, u.locality_user, u.city, u.state, u.country,sum(r.distance) AS total_distance, sum(r.run_amount) AS total_amount," +
  "u.social_thumb, u.birthday, u.cheat_flag, u.body_height, u.body_weight FROM public.share_api_users u " +
  "LEFT JOIN public.oauth2_provider_accesstoken o ON u.user_id = o.user_id " +
  "LEFT JOIN public.share_api_runs r ON o.user_id = r.user_id_id where o.token=:token_id " +
  "GROUP BY u.user_id, o.token, u.first_name, u.last_name, u.gender_user, u.email_id, u.phone_number,u.address;"


async function getTeamId(user) {
  let team = await db.employee.findAll({
    attributes: ["team_id"],
    where: {
      user_id: user,
      is_logout: false
    }
  }).then(team => {
    team = JSON.parse(JSON.stringify(team));
    team = team[0].team_id
    return team;
  })

  return team;

}

var userModel = {

  //GET all users
  getUsers(req, res) {

    var urlQuery = req.query;
    let user = req.user_id;
    const token = req.headers.authorization;

    let token_parts = token.split(' ');

    var whereQuery = pagin.createQuery(urlQuery, filterList);
    if (!urlQuery.user_id) {

      whereQuery.user_id = user;
    }
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
  async getActualUserData(req, res) {
    var urlQuery = req.query;
    let user = req.user_id;
    const token = req.headers.authorization;
    let token_parts = token.split(' ');
    let team = await getTeamId(user);



    return sequelize.query(actualUserData,
      {
        replacements: { token_id: token_parts[1] },
        type: sequelize.QueryTypes.SELECT
      }
    ).then(results => {

      let overall = {};
      overall = results[0];

      let distance = {
        total_distance: overall.total_distance
      };
      let amount = {
        total_amount: overall.total_amount
      };

      overall.auth_token = overall.token;
      overall.total_distance = distance;
      overall.total_amount = amount;
      overall.team_code = team;
      delete overall.token;
      results[0] = overall;
      console.log("RESULTS......", results);
      res.json(results  );
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