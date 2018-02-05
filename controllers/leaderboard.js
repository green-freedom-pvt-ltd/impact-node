
const logger = require('../logger');
const pagin = require('../middleware/pagination');
const db = require('../db/index');
const env = require('../config/settings');
const paginconfig = env.pagination;
var Sequelize = require("sequelize");
// var config = require('config');
// var dbConfig = config.get('Customer.dbConfig');
var sequelize = new Sequelize('share_backend_dev_api', 'nishant', 'Impact123', {
    host: 'localhost',
    dialect: 'postgres',
    pool: {
        "max": 5,
        "min": 0,
        "idle": 10000
    }
    //logging: false
});


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
    "ORDER BY (sum(r.distance)) DESC "

var feedback = {


    //get all feedback for particular users and filters
    getOverallLeaderboard(req, res) {
        var urlQuery = req.query;
        
        return sequelize.query(queryOvelallleaderbord).spread(function (results,metadata) {
            console.log("RESULTS......",results.length);
            var onverall={};
            onverall.count=results.length;
            onverall.rows=results;
            res.json(pagin.getPagination(onverall, req, paginconfig.SMALL));
        }).catch(err => {
                res.status(500).send({ error: 'Something failed! Contact the admin.' })
                throw new Error(err);
            })

    },
};
module.exports = feedback;
