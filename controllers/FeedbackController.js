
const logger = require('../logger');
const pagin = require('../middleware/pagination');
const db = require('../db/index');
const env = require('../config/settings');
const paginconfig = env.pagination;
var Sequelize = require("sequelize");

const filterList = [
    'user_id_id',
    'is_chat',
    'tag',
    'sub_tag',
    'is_ios'
];

const parameterTypes = {
    user_id_id: 'integer',
    is_chat: 'boolean',
    tag: 'string',
    sub_tag: 'string',
    is_ios: 'string'
};

var feedback = {
    //get all feedback for particular users and filters
    getFeedback(req, res) {
        var urlQuery = req.query;
        try {
            var whereQuery = pagin.createQuery(urlQuery, filterList, parameterTypes);
        } catch (err) {
            // res.send({Error:err},400);
            res.status(400).send({error:err})
            throw err;
        }
        return db.feedback.findAndCountAll({
            where: whereQuery,
            limit: paginconfig.SMALL,
            offset: (urlQuery.page == 0 || (isNaN(urlQuery.page)) ? 1 : urlQuery.page == 1) ? 0 : ((urlQuery.page - 1) * paginconfig.SMALL),
            order: Sequelize.literal('id DESC')
        })
            .then(feedback => {
                res.json(pagin.getPagination(feedback, req, paginconfig.SMALL));
            })
            .catch(err => {
                res.status(500).send({ error: 'Something failed! Contact the admin.' })
                throw new Error(err);
            })

    },
};
module.exports = feedback;