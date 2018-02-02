
// var config = require('config');
// var pagination = config.get('Customer.pagination');
const logger = require('../logger');
const pagin = require('../middleware/pagination');
const db = require('../db/index');
const env = require('../config/settings');
const paginconfig = env.pagination;

const filterList = [];
const parameterTypes = {};


var fields = ["id", "impactleague_name","impactleague_banner", "duration", "start_date","end_date", "is_active","team_size","impactleague_banner_site","impactleague_description_site","email_type","module", ["company_id","company"]]

var League = {

    //get single league
    getLeague(req, res) {
      
        var urlQuery = req.query;
        try {
            var whereQuery = pagin.createQuery(urlQuery, filterList, parameterTypes);
        } catch (err) {
            // res.send({Error:err},400);
            res.status(400).send({error:err})
            throw err;
        }
        return db.impactLeague.findAndCountAll({
            where: whereQuery,
            attributes:fields, 
            limit: paginconfig.SMALL,
            offset: (urlQuery.page == 0 || (isNaN(urlQuery.page)) ? 1 : urlQuery.page == 1) ? 0 : ((urlQuery.page - 1) * paginconfig.SMALL)

        })
        .then(league => {
            res.json(pagin.getPagination(league, req, paginconfig.SMALL));
        })
        .catch(err =>{
            res.status(500).send({ error: 'Something failed! Contact the admin.' })
            throw new Error(err);
        })

    }
}

module.exports = League;