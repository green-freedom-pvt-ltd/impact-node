
// var config = require('config');
// var pagination = config.get('Customer.pagination');
const logger = require('../logger');
const pagin = require('../middleware/pagination');
const db = require('../db/index');
const env = require('../config/settings');
const paginconfig = env.pagination;
var Sequelize = require("sequelize");

const Op = Sequelize.Op;
const baseUrl = 'http://localhost:3000/userFeedback';
const filterList = ['user_id_id', 'is_chat', 'tag', 'sub_tag', 'is_ios'];

var feedback = {

    //get all feedback from single user
    getFeedback(req, res) {
        var user_id = req.params.user_id;
        user_id = parseInt(user_id);
        var urlQuery = req.query;
        var whereQuery = {
                user_id_id: user_id
            }

        var keys = Object.keys(urlQuery);
        for (var i = 0; i < keys.length; i++) {
          logger.info('inside loop', keys[i], urlQuery[keys[i]], filterList.includes(keys[i]));
          if (filterList.includes(keys[i])) {
            whereQuery[keys[i]]= urlQuery[keys[i]];
          }
        }
        // logger.info("offset----------",offset);
        if (user_id) {
            return db.feedback.findAndCountAll({
                where: whereQuery,
                limit: paginconfig.SMALL,
                offset: urlQuery.page ? ((urlQuery.page - 1) * paginconfig.SMALL) : 0
            })
            .then(feedback => {
                var url = baseUrl + '/' + user_id;
                res.json(pagin.getPagination(feedback, req.query, url, paginconfig.SMALL));
            })
        }
        //get all feedback
        else {
            return db.feedback.findAndCountAll(pagin.getOffset(paginconfig.SMALL, req.query))
                .then(feedback => {
                    // console.log("limit", pagination.NORMAL);
                    res.json(pagin.getPagination(feedback, req.query, baseUrl, paginconfig.SMALL));
                })
        }

    }
}

module.exports = feedback;