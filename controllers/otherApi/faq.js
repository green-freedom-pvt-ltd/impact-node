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


var URL_FOR_IMAGE = env.PROD_DOMAIN + 'media/'

var faqs = {
    getFaqs(req, res) {
        var urlQuery = req.query;
        let LIMIT = paginconfig.NORMAL;
        let final_data = [];
        // checking query string is integer and page > 0
        if ((parseInt(urlQuery.page) && parseInt(urlQuery.page) > 0) ||_.isEmpty(urlQuery)){
            db.faqs.findAndCountAll({
                attributes: [["user_id_id", "user_id"], "question", "answer", "user_email"],
                where:{
                    is_active:true
                },
                limit: LIMIT,
                offset: (urlQuery.page == 0 || (isNaN(urlQuery.page)) ? 1 : urlQuery.page == 1) ? 0 : ((urlQuery.page - 1) * LIMIT)
            })
            .then((faq) => {
                console.log("CAME IN FUN.")
                    let paginate = pagin.getPagination(faq, req, LIMIT);

                    res.json(paginate);
                })
                .catch((error) => {
                    res.status(400).send({ "error": "Error occured!!" });
                })
        }
        else {

            res.status(400).send({ "error": "Something failed! Contact the admin." });
        }
    }

}

module.exports = faqs;