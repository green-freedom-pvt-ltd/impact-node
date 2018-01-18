
// var config = require('config');
// var pagination = config.get('Customer.pagination');
const logger = require('../logger');
const pagin = require('../middleware/pagination');
const db = require('../db/index');
const env = require('../config/settings');
const paginconfig = env.pagination;

const baseUrl = 'http://localhost:3000/impactleague';


var League = {

    //get single league
    getLeague(req, res) {
        var league = req.params.id;
        league = parseInt(league);
    
        if (league) {
            return db.impactLeague.findAndCountAll({
                where: {
                    id: league
                }
            })
                .then(league => {
                   
                    res.json(pagin.getPagination(league, req.query, baseUrl, paginconfig.NORMAL));
                })
        }
        //get all leagues
        else {
            return db.impactLeague.findAndCountAll(pagin.getOffset(paginconfig.SMALL, req.query))
                .then(league => {
                    // console.log("limit", pagination.NORMAL);
                    res.json(pagin.getPagination(league, req.query, baseUrl, paginconfig.SMALL));
                })
        }

    }
}

module.exports = League;