
var config = require('config');
var pagination = config.get('Customer.pagination');
const logger = require('../logger');
const pagin = require('../middleware/pagination');
const db = require('../db/index');

const baseUrl = 'http://localhost:3000/userFeedback';

var feedback = {
    getFeedback(req, res) {
        var user_id = req.params.user_id;
        user_id = parseInt(user_id);
    
        if (user_id) {
            return db.feedback.findAndCountAll({
                where: {
                    user_id_id: user_id
                }
            })
                .then(feedback => {
                    var url = baseUrl + '/' + user_id;
                    res.json(pagin.getPagination(feedback, req.query, url, pagination.NORMAL));
                })
        }
        //get all runs
        else {
            return db.feedback.findAndCountAll(pagin.getOffset(pagination.NORMAL, req.query))
                .then(feedback => {
                    // console.log("limit", pagination.NORMAL);
                    res.json(pagin.getPagination(feedback, req.query, baseUrl, pagination.NORMAL));
                })
        }

    }
}

module.exports = feedback;