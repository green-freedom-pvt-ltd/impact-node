// import { json } from "../../../../.cache/typescript/2.6/node_modules/@types/express";



var config = require('config');
const logger = require('../../logger');
const db = require('../../db/index');
const pagin = require('../../middleware/pagination');
const env = require('../../config/settings');
const paginconfig = env.pagination;
var Sequelize = require("sequelize");
var sequelize = db.sequelize;
const Op = Sequelize.Op

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
        console.log("paginconfig------------------", paginconfig.NORMAL);
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

}


module.exports = leaderboardModel;