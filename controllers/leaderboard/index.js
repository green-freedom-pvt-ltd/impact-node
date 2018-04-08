var config = require('config');
const logger = require('../../logger');
const db = require('../../db/index');
const pagin = require('../../middleware/pagination');
const env = require('../../config/settings');
const paginconfig = env.pagination;
var Sequelize = require("sequelize");
var sequelize = db.sequelize;
const Op = Sequelize.Op
let _ = require('underscore');

const filterList = [];
const parameterTypes = {};

// const attributes = [
//     'user_id',
//     [sequelize.fn('sum', sequelize.col('run_count')), 'run_count'],
//     [sequelize.fn('sum', sequelize.col('dist_agg')), 'dist_agg'],
//     [sequelize.fn('sum', sequelize.col('amt_agg')), 'amt_agg'],
//     [sequelize.fn('sum', sequelize.col('walk_dist_agg')), 'walk_dist_agg'],
//     [sequelize.fn('sum', sequelize.col('walk_amt_agg')), 'walk_amt_agg'],
//     [sequelize.fn('sum', sequelize.col('run_dist_agg')), 'run_dist_agg'],
//     [sequelize.fn('sum', sequelize.col('run_amt_agg')), 'run_amt_agg'],
//     [sequelize.fn('sum', sequelize.col('super_dist_agg')), 'super_dist_agg'],
//     [sequelize.fn('sum', sequelize.col('super_amt_agg')), 'super_amt_agg'],
//     [sequelize.fn('sum', sequelize.col('dist_7')), 'dist_7'],
//     [sequelize.fn('sum', sequelize.col('amt_7')), 'amt_7'],
//     [sequelize.fn('sum', sequelize.col('walk_dist_7')), 'walk_dist_7'],
//     [sequelize.fn('sum', sequelize.col('walk_amt_7')), 'walk_amt_7'],
//     [sequelize.fn('sum', sequelize.col('run_dist_7')), 'run_dist_7'],
//     [sequelize.fn('sum', sequelize.col('run_amt_7')), 'run_amt_7'],
//     [sequelize.fn('sum', sequelize.col('super_dist_7')), 'super_dist_7'],
//     [sequelize.fn('sum', sequelize.col('super_amt_7')), 'super_amt_7'],
//     [sequelize.fn('sum', sequelize.col('dist_30')), 'dist_30'],
//     [sequelize.fn('sum', sequelize.col('amt_30')), 'amt_30'],
//     [sequelize.fn('sum', sequelize.col('walk_dist_30')), 'walk_dist_30'],
//     [sequelize.fn('sum', sequelize.col('walk_amt_30')), 'walk_amt_30'],
//     [sequelize.fn('sum', sequelize.col('run_dist_30')), 'run_dist_30'],
//     [sequelize.fn('sum', sequelize.col('run_amt_30')), 'run_amt_30'],
//     [sequelize.fn('sum', sequelize.col('super_dist_30')), 'super_dist_30'],
//     [sequelize.fn('sum', sequelize.col('super_amt_30')), 'super_amt_30'],
// ];




let GET_AGGREGATE_LEADERBOARD_QUERY = ` SELECT "la"."user_id",
"la"."amount_all" AS "amount", 
"la"."distance_all" AS "distance", 
 "share_api_user"."first_name" AS "first_name",
  "share_api_user"."last_name" AS "last_name", 
row_number() OVER (ORDER BY (distance_all) DESC) AS ranking,
"share_api_user"."email" AS "email", 
"share_api_user"."gender_user" AS "gender_user", 
"share_api_user"."phone_number" AS "phone_number",
 "share_api_user"."social_thumb" AS "social_thumb", 
 "share_api_user"."birthday" AS "birthday"
  FROM "share_api_leaderboard" AS "la" 
  LEFT OUTER JOIN "share_api_users" AS "share_api_user" 
  ON "la"."user_id" = "share_api_user"."user_id"
   ORDER BY "distance_all" DESC LIMIT :limit;`

let GET_LAST_WEEK_LEADERBOARD_QUERY = `SELECT "la"."user_id",
   "la"."amount_7" AS "amount", 
   "la"."distance_7" AS "distance", 
    "share_api_user"."first_name" AS "first_name",
     "share_api_user"."last_name" AS "last_name", 
   row_number() OVER (ORDER BY (amount_7) DESC) AS ranking,
   "share_api_user"."email" AS "email", 
   "share_api_user"."gender_user" AS "gender_user", 
   "share_api_user"."phone_number" AS "phone_number",
    "share_api_user"."social_thumb" AS "social_thumb", 
    "share_api_user"."birthday" AS "birthday"
     FROM "share_api_leaderboard" AS "la" 
     LEFT OUTER JOIN "share_api_users" AS "share_api_user" 
     ON "la"."user_id" = "share_api_user"."user_id"
      ORDER BY "amount_7" DESC LIMIT :limit;`


let GET_LAST_MONTH_LEADERBOARD_QUERY = `SELECT "la"."user_id",
      "la"."amount_30" AS "amount", 
      "la"."distance_30" AS "distance", 
       "share_api_user"."first_name" AS "first_name",
        "share_api_user"."last_name" AS "last_name", 
      row_number() OVER (ORDER BY (amount_30) DESC) AS ranking,
      "share_api_user"."email" AS "email", 
      "share_api_user"."gender_user" AS "gender_user", 
      "share_api_user"."phone_number" AS "phone_number",
       "share_api_user"."social_thumb" AS "social_thumb", 
       "share_api_user"."birthday" AS "birthday"
        FROM "share_api_leaderboard" AS "la" 
        LEFT OUTER JOIN "share_api_users" AS "share_api_user" 
        ON "la"."user_id" = "share_api_user"."user_id"
         ORDER BY "amount_30" DESC LIMIT :limit;`


let GET_IF_USER_NOT_AVAILABLE_AGG_QUERY = `SELECT l."user_id", 
l."amount_all" AS "amount", l."distance_all" AS "distance",
"share_api_user"."first_name" AS "first_name",  "share_api_user"."last_name" AS "last_name",
row_number() OVER (ORDER BY (distance_all) DESC) AS ranking,  "share_api_user"."email" AS "email",
  "share_api_user"."gender_user" AS "gender_user", "share_api_user"."phone_number" AS "phone_number", 
  "share_api_user"."social_thumb" AS "social_thumb", "share_api_user"."birthday" AS "birthday",
  (
SELECT  COUNT(*)
FROM    share_api_leaderboard ll
WHERE   ll."distance_all" >= l."distance_all"

) AS ranking
  FROM "share_api_leaderboard" AS l LEFT OUTER JOIN 
  "share_api_users" AS "share_api_user" ON l."user_id" = "share_api_user"."user_id" 
WHERE l."user_id" = :user`;

let GET_IF_USER_NOT_AVAILABLE_LAST30_QUERY = `SELECT l."user_id", 
l."amount_30" AS "amount", l."distance_30" AS "distance",
"share_api_user"."first_name" AS "first_name",  "share_api_user"."last_name" AS "last_name",
row_number() OVER (ORDER BY (amount_30) DESC) AS ranking,  "share_api_user"."email" AS "email",
  "share_api_user"."gender_user" AS "gender_user", "share_api_user"."phone_number" AS "phone_number", 
  "share_api_user"."social_thumb" AS "social_thumb", "share_api_user"."birthday" AS "birthday",
  (
SELECT  COUNT(*)
FROM    share_api_leaderboard ll
WHERE   ll."amount_30" >= l."amount_30"

) AS ranking
  FROM "share_api_leaderboard" AS l LEFT OUTER JOIN 
  "share_api_users" AS "share_api_user" ON l."user_id" = "share_api_user"."user_id" 
WHERE l."user_id" = :user`;
let GET_IF_USER_NOT_AVAILABLE_LAST7_QUERY = `SELECT l."user_id", 
l."amount_7" AS "amount", l."distance_7" AS "distance",
"share_api_user"."first_name" AS "first_name",  "share_api_user"."last_name" AS "last_name",
row_number() OVER (ORDER BY (amount_7) DESC) AS ranking,  "share_api_user"."email" AS "email",
  "share_api_user"."gender_user" AS "gender_user", "share_api_user"."phone_number" AS "phone_number", 
  "share_api_user"."social_thumb" AS "social_thumb", "share_api_user"."birthday" AS "birthday",
  (
SELECT  COUNT(*)
FROM    share_api_leaderboard ll
WHERE   ll."amount_7" >= l."amount_7"

) AS ranking
  FROM "share_api_leaderboard" AS l LEFT OUTER JOIN 
  "share_api_users" AS "share_api_user" ON l."user_id" = "share_api_user"."user_id" 
WHERE l."user_id" = :user`;





function getData(top_user, my_data, user_id) {
    return sequelize.query(top_user,
        {
            replacements: { limit: env.pagination.MEDIUM },
            type: sequelize.QueryTypes.SELECT
        }
    )
        .then((result) => {
            //console.log("user DATA",result.length);
            let arr = [];
            let data = JSON.parse(JSON.stringify(result));
            var check_user_id = _.contains(data, user_id);
            if (!check_user_id) {
                return sequelize.query(my_data,
                    {
                        replacements: { user: user_id },
                        type: sequelize.QueryTypes.SELECT
                    }
                )
                    .then((user_data) => {
                        data = data.concat(user_data);
                        let leaderboard_data = {};
                        leaderboard_data.count = data.length;
                        leaderboard_data.results = data
                        return leaderboard_data;

                    })
                    .catch((err) => {
                        logger.error("error occured", err);
                        return err;
                    })
                // console.log("my_legue_data",my_legue_data);
                // return my_legue_data;
            }
            else {
                let new_value = data.map((current, index) => {
                    let leaderboard_data = {};
                    leaderboard_data.user_id = current.user_id;
                    leaderboard_data.ranking = index + 1;
                    leaderboard_data.amount = current.amount;
                    leaderboard_data.distance = current.distance;
                    leaderboard_data.first_name = current.share_api_user.first_name;
                    leaderboard_data.last_name = current.share_api_user.last_name;
                    leaderboard_data.email = current.share_api_user.email;
                    leaderboard_data.gender_user = current.share_api_user.gender_user;
                    leaderboard_data.phone_number = current.share_api_user.phone_number;
                    leaderboard_data.social_thumb = current.share_api_user.social_thumb;
                    leaderboard_data.birthday = current.share_api_user.birthday;
                    arr.push(leaderboard_data);
                })
                return leaderboard_data;

            }
            //console.log("User data",user_data);


        })
        .catch((err) => {
            logger.error("ERROR", err);
            return err;
        })

}

var leaderboardModel = {
    async getLeaderboard(req, res) {
        const user = req.user_id;

        var duration = req.query;
        console.log("DURATION", duration);
        //var getLeaderboard = '';
        if (duration.interval === 'all_time') {

            let leaderboard_data = await getData(GET_AGGREGATE_LEADERBOARD_QUERY, GET_IF_USER_NOT_AVAILABLE_AGG_QUERY, user);
            console.log("leaderboard_data", leaderboard_data);
            res.status(200).send(leaderboard_data);
        }
        else if (duration.interval === 'last_30') {
            let leaderboard_data = await getData(GET_LAST_MONTH_LEADERBOARD_QUERY, GET_IF_USER_NOT_AVAILABLE_LAST30_QUERY, user);
            console.log("leaderboard_data", leaderboard_data.results);
            if (leaderboard_data.results) {
                res.status(200).send(leaderboard_data);
            }
            else {
                res.status(400).send({ "error": "Something failed! Contact the admin." });
            }


        }
        else if (duration.interval === 'last_7') {
            let leaderboard_data = await getData(GET_LAST_WEEK_LEADERBOARD_QUERY, GET_IF_USER_NOT_AVAILABLE_LAST7_QUERY, user);
            console.log("leaderboard_data", leaderboard_data);
            res.status(200).send(leaderboard_data);
        }
        else {
            res.status(400).send({ error: 'Please enter intervel' });
        }
    }
}


module.exports = leaderboardModel;