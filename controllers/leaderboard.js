
const logger = require('../logger');
const pagin = require('../middleware/pagination');
const db = require('../db/index');
const env = require('../config/settings');
const paginconfig = env.pagination;
var Sequelize = require("sequelize");
var sequelize = db.sequelize;
// var config = require('config');
// var dbConfig = config.get('Customer.dbConfig');


// this gives top 51 runner's records of overall
var queryOvelallleaderbord = "SELECT u.first_name," +
    "sum(r.distance) AS distance," +
    "row_number() OVER (ORDER BY (sum(r.distance)) DESC) AS ranking," +
    "u.user_id," +
    "u.last_name," +
    "u.gender_user," +
    "u.email," +
    "u.phone_number," +
    "u.social_thumb," +
    "u.birthday," +
    "sum(r.run_amount) AS amount " +
    "FROM share_api_users u " +
    "LEFT JOIN share_api_runs r ON u.user_id = r.user_id_id " +
    "WHERE r.is_flag = false AND u.cheat_flag = false " +
    "GROUP BY u.first_name, u.user_id, u.last_name, u.gender_user, u.email, u.phone_number, u.social_thumb, u.birthday " +
    "ORDER BY (sum(r.distance)) DESC LIMIT 51 "

    // this gives top 51 runner's records of Last 7 days 
var queryLastweekleaderbord = "SELECT u.first_name," +
    "sum(r.distance) AS distance," +
    "row_number() OVER (ORDER BY (sum(r.distance)) DESC) AS ranking," +
    "u.user_id," +
    "u.last_name," +
    "u.gender_user," +
    "u.email," +
    "u.phone_number," +
    "u.social_thumb," +
    "u.birthday," +
    "sum(r.run_amount) AS amount " +
    "FROM share_api_users u " +
    "LEFT JOIN share_api_runs r ON u.user_id = r.user_id_id " +
    "WHERE r.is_flag = false AND r.start_time > ('now'::text::date - '7 days'::interval) AND u.cheat_flag = false " +
    "GROUP BY u.first_name, u.user_id, u.last_name, u.gender_user, u.email, u.phone_number, u.social_thumb, u.birthday " +
    "ORDER BY (sum(r.distance)) DESC LIMIT 51;"

    // this gives top 51 runner's records of Last 30 days 
var queryLastmonthleaderbord = "SELECT u.first_name," +
    "  sum(r.distance) AS distance," +
    "row_number() OVER (ORDER BY (sum(r.distance)) DESC) AS ranking," +
    "u.user_id," +
    "u.last_name," +
    "u.gender_user," +
    "u.email," +
    "u.phone_number," +
    "u.social_thumb," +
    "u.birthday," +
    "sum(r.run_amount) AS amount " +
    "FROM share_api_users u " +
    "LEFT JOIN share_api_runs r ON u.user_id = r.user_id_id " +
    "WHERE r.is_flag = false AND r.start_time > ('now'::text::date - '30 days'::interval) AND u.cheat_flag = false " +
    "GROUP BY u.first_name, u.user_id, u.last_name, u.gender_user, u.email, u.phone_number, u.social_thumb, u.birthday " +
    "ORDER BY (sum(r.distance)) DESC LIMIT 51;"



var leaderboard = {


    //get all feedback for particular users and filters
    getOverallLeaderboard(req, res) {
        var urlQuery = req.query;
        var getLeaderboard = '';
        if (urlQuery.interval === 'all_time') {
            getLeaderboard = queryOvelallleaderbord
        }
        else if (urlQuery.interval === 'last_30') {
            getLeaderboard = queryLastmonthleaderbord;
        }
        else if (urlQuery.interval === 'last_7') {
            getLeaderboard = queryLastweekleaderbord;
        }
        else {
            //console.log("GETTING Intervel", urlQuery.interval);
            res.status(400).send({ error: 'Please enter intervel' });
        }
        if(getLeaderboard){
            return sequelize.query(getLeaderboard).spread(function (results, metadata) {
               // console.log("RESULTS......", results.length);
                var onverall = {};
                onverall.count = results.length;
                onverall.rows = results;
                res.json(onverall);
            }).catch(err => {
                res.status(500).send({ error: 'Something failed! Contact the admin.' })
                throw new Error(err);
            })
        }
        else{
            res.status(400).send({ error: 'Please enter intervel' });
        }
        
        

    },
};
module.exports = leaderboard;
