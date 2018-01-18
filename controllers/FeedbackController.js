
<<<<<<< HEAD
// var config = require('config');
// var pagination = config.get('Customer.pagination');
=======
>>>>>>> 365030f7e6fbba6169dac4aab42e6c18330be350
const logger = require('../logger');
const pagin = require('../middleware/pagination');
const db = require('../db/index');
const env = require('../config/settings');
const paginconfig = env.pagination;
var Sequelize = require("sequelize");

const baseUrl = 'http://localhost:3000/userFeedback';
const filterList = ['user_id_id', 'is_chat', 'tag', 'sub_tag', 'is_ios'];

// This function helps us build a query object to pass in sequalize find function 
// it takes parameters one by one from the url query and adds only if
// it is present in the filter paramater list 
function createQuery(urlQuery) {
    var whereQuery = {};
    var keys = Object.keys(urlQuery);
    for (var i = 0; i < keys.length; i++) {
      // logger.info('inside loop', keys[i], urlQuery[keys[i]], filterList.includes(keys[i]));
      if (filterList.includes(keys[i])) {
        whereQuery[keys[i]]= urlQuery[keys[i]];
      }
    }
    return whereQuery;
}


var feedback = {
    //get all feedback for particular users and filters
    getFeedback(req, res) {
        var urlQuery = req.query;
        var whereQuery = createQuery(urlQuery);
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