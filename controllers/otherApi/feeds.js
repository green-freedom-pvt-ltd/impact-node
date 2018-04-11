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

var feeds = {
    getFeeds(req, res) {
        var urlQuery = req.query;
        let LIMIT = paginconfig.NORMAL;
        let final_data = [];
        // checking query string is integer and page > 0
        if (parseInt(urlQuery.page) && parseInt(urlQuery.page) > 0) {
           
            db.feeds.findAndCountAll({
                limit: LIMIT,
                offset: (urlQuery.page == 0 || (isNaN(urlQuery.page)) ? 1 : urlQuery.page == 1) ? 0 : ((urlQuery.page - 1) * LIMIT)
            })
                .then((feed) => {
                    let paginate = pagin.getPagination(feed, req, LIMIT);
                    let update_data = JSON.parse(JSON.stringify(paginate));
                    let data = _.map(update_data.results, (val) => {
                        val.message_image = URL_FOR_IMAGE + val.message_image;
                        final_data.push(val);
                    })
                    update_data.results = final_data;
                    res.json(update_data);
                })
                .catch((error)=>{
                    res.status(400).send({"error":"Error occured!!"});
                })
        }
        else {
         
            res.status(400).send({ "error": "Something failed! Contact the admin." });
        }

    }

}

module.exports = feeds;