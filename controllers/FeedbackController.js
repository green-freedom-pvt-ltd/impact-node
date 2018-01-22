
const logger = require('../logger');
const pagin = require('../middleware/pagination');
const db = require('../db/index');
const env = require('../config/settings');
const paginconfig = env.pagination;
var Sequelize = require("sequelize");


const baseUrl = 'http://localhost:3000/';
const filterList = ['user_id_id', 'is_chat', 'tag', 'sub_tag', 'is_ios'];

var feedback = {
    //get all feedback for particular users and filters
    getFeedback(req, res) {

  
        var urlQuery = req.query;
        var whereQuery = pagin.createQuery(urlQuery, filterList);
     
        return db.feedback.findAndCountAll({
            where: whereQuery,
            limit: paginconfig.SMALL,
            offset: (urlQuery.page == 0 || (isNaN(urlQuery.page))?1:urlQuery.page == 1) ? 0: ((urlQuery.page - 1) * paginconfig.SMALL)
         
        })
        .then(feedback => {
            res.json(pagin.getPagination(feedback, req, baseUrl, paginconfig.SMALL));
        })
        .catch(err =>{
            console.log("CAME in catch");
            throw new Error("PLease check URL");
        })

    },
};
module.exports = feedback;