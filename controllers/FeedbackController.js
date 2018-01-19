
const logger = require('../logger');
const pagin = require('../middleware/pagination');
const db = require('../db/index');
const env = require('../config/settings');
const paginconfig = env.pagination;
var Sequelize = require("sequelize");

const baseUrl = 'http://localhost:3000/userFeedback';
const filterList = ['user_id_id', 'is_chat', 'tag', 'sub_tag', 'is_ios'];

var feedback = {
    //get all feedback for particular users and filters
    getFeedback(req, res) {
        var urlQuery = req.query;
        var whereQuery = pagin.createQuery(urlQuery, filterList);
        logger.info("whereQuery----------",urlQuery, whereQuery);
        return db.feedback.findAndCountAll({
            where: whereQuery,
            limit: paginconfig.SMALL,
            offset: urlQuery.page ? ((urlQuery.page - 1) * paginconfig.SMALL) : 0
        })
        .then(feedback => {
            res.json(pagin.getPagination(feedback, req.query, baseUrl, paginconfig.SMALL));
        })

    },
};
module.exports = feedback;