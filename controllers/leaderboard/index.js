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

const attributes = [
    'user_id',
    [sequelize.fn('sum', sequelize.col('run_count')), 'run_count'],
    [sequelize.fn('sum', sequelize.col('dist_agg')), 'dist_agg'],
    [sequelize.fn('sum', sequelize.col('amt_agg')), 'amt_agg'],
    [sequelize.fn('sum', sequelize.col('walk_dist_agg')), 'walk_dist_agg'],
    [sequelize.fn('sum', sequelize.col('walk_amt_agg')), 'walk_amt_agg'],
    [sequelize.fn('sum', sequelize.col('run_dist_agg')), 'run_dist_agg'],
    [sequelize.fn('sum', sequelize.col('run_amt_agg')), 'run_amt_agg'],
    [sequelize.fn('sum', sequelize.col('super_dist_agg')), 'super_dist_agg'],
    [sequelize.fn('sum', sequelize.col('super_amt_agg')), 'super_amt_agg'],
    [sequelize.fn('sum', sequelize.col('dist_7')), 'dist_7'],
    [sequelize.fn('sum', sequelize.col('amt_7')), 'amt_7'],
    [sequelize.fn('sum', sequelize.col('walk_dist_7')), 'walk_dist_7'],
    [sequelize.fn('sum', sequelize.col('walk_amt_7')), 'walk_amt_7'],
    [sequelize.fn('sum', sequelize.col('run_dist_7')), 'run_dist_7'],
    [sequelize.fn('sum', sequelize.col('run_amt_7')), 'run_amt_7'],
    [sequelize.fn('sum', sequelize.col('super_dist_7')), 'super_dist_7'],
    [sequelize.fn('sum', sequelize.col('super_amt_7')), 'super_amt_7'],
    [sequelize.fn('sum', sequelize.col('dist_30')), 'dist_30'],
    [sequelize.fn('sum', sequelize.col('amt_30')), 'amt_30'],
    [sequelize.fn('sum', sequelize.col('walk_dist_30')), 'walk_dist_30'],
    [sequelize.fn('sum', sequelize.col('walk_amt_30')), 'walk_amt_30'],
    [sequelize.fn('sum', sequelize.col('run_dist_30')), 'run_dist_30'],
    [sequelize.fn('sum', sequelize.col('run_amt_30')), 'run_amt_30'],
    [sequelize.fn('sum', sequelize.col('super_dist_30')), 'super_dist_30'],
    [sequelize.fn('sum', sequelize.col('super_amt_30')), 'super_amt_30'],
];


var leaderboardModel = {
    getLeaderboard(req, res) {
        var urlQuery = req.query;
        var whereQuery = pagin.createQuery(urlQuery, filterList);
        console.log("paginconfig------------------", paginconfig.NORMAL);
        return db.leaderboard.findAll({
            where: whereQuery,
            limit: paginconfig.NORMAL,
            attributes: attributes,
            group: 'user_id',
            order: [[sequelize.fn('sum', sequelize.col('dist_agg')), 'DESC']],
            offset: (urlQuery.page == 0 || (isNaN(urlQuery.page)) ? 1 : urlQuery.page == 1) ? 0 : ((urlQuery.page - 1) * paginconfig.NORMAL)
        })
            .then(user => {
                res.json(pagin.getPagination(user, req, paginconfig.NORMAL));
            })

    },


    getAggregateLeaderboard(req, res) {
        var urlQuery = req.query;
        var whereQuery = pagin.createQuery(urlQuery, filterList);
        console.log("paginconfig------------------", whereQuery);
        return db.leaderboard.findAll({
            where: whereQuery,
            limit: paginconfig.NORMAL,
            attributes: attributes,
            group: 'user_id',
            order: [[sequelize.fn('sum', sequelize.col('amt_agg')), 'DESC']],
            offset: (urlQuery.page == 0 || (isNaN(urlQuery.page)) ? 1 : urlQuery.page == 1) ? 0 : ((urlQuery.page - 1) * paginconfig.NORMAL)
        })
            .then(user => {
                res.json(pagin.getPagination(user, req, paginconfig.NORMAL));
            })

    },

    getWeekLeaderboard(req, res) {
        var urlQuery = req.query;
        var whereQuery = pagin.createQuery(urlQuery, filterList);
        console.log("paginconfig------------------", paginconfig.NORMAL);
        return db.leaderboard.findAll({
            where: {
                amt_7: {
                    [Op.ne]: null
                }
            },
            limit: paginconfig.NORMAL,
            attributes: attributes,
            group: 'user_id',
            order: [[sequelize.fn('sum', sequelize.col('amt_7')), 'DESC']],
            offset: (urlQuery.page == 0 || (isNaN(urlQuery.page)) ? 1 : urlQuery.page == 1) ? 0 : ((urlQuery.page - 1) * paginconfig.NORMAL)
        })
            .then(user => {
                res.json(pagin.getPagination(user, req, paginconfig.NORMAL));
            })

    },


    getMonthLeaderboard(req, res) {
        var urlQuery = req.query;
        var whereQuery = pagin.createQuery(urlQuery, filterList);
        console.log("paginconfig------------------", paginconfig.NORMAL);
        return db.leaderboard.findAll({
            where: {
                amt_30: {
                    [Op.ne]: null
                }
            },
            limit: paginconfig.NORMAL,
            attributes: attributes,
            group: 'user_id',
            order: [[sequelize.fn('sum', sequelize.col('amt_30')), 'DESC']],
            offset: (urlQuery.page == 0 || (isNaN(urlQuery.page)) ? 1 : urlQuery.page == 1) ? 0 : ((urlQuery.page - 1) * paginconfig.NORMAL)
        })
            .then(user => {
                res.json(pagin.getPagination(user, req, paginconfig.NORMAL));
            })

    },

    getLeaderboard(req, res) {
        //row_number() OVER (ORDER BY (sum(r.distance)) DESC) AS ranking
       
        const user = req.user_id;
        return db.leaderboard.findAll({
            attributes: ['user_id', ['amt_agg', 'amount'], ['dist_agg', 'distance']],
           // ['row_number() OVER (ORDER BY (dist_agg) DESC)','ranking' ]],
            include: [
                {
                    model: db.users,
                    attributes:
                        ['first_name', 'last_name', 'email', 'gender_user',
                            'phone_number', 'social_thumb', 'birthday']

                }
            ],
            order:[[sequelize.col('dist_agg'), 'DESC']],
            
            limit: 50
        })
            .then((result) => {
                let arr = [];
                let data = JSON.parse(JSON.stringify(result));
                console.log('DATA.......', data);
                var check_user_id =_.contains(data,user);
                console.log("Checking existince of user id",check_user_id, user);
                if(!check_user_id){
                   let user_data = db.leaderboard.findAll({
                        attributes: ['user_id', ['amt_agg', 'amount'], ['dist_agg', 'distance']],
                        include: [
                            {
                                model: db.users,
                                attributes:
                                    ['first_name', 'last_name', 'email', 'gender_user',
                                        'phone_number', 'social_thumb', 'birthday']
            
                            }
                        ],
                        where:{
                            user_id:user,
                            team_id: 196
                        }
                    })
                    .then((user_data)=>{
                        data = data.concat(JSON.parse(JSON.stringify(user_data)));
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
                        res.json(arr);
                        //return data;
                        //console.log("DATA.......",data);
                    })
                   
                    
                }
                else{
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
                    res.json(arr);

                }
                //console.log("User data",user_data);
             
             
            })
    }

}


module.exports = leaderboardModel;