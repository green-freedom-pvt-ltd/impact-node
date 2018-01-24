
// var config = require('config');
// var pagination = config.get('Customer.pagination');
const logger = require('../logger');
const pagin = require('../middleware/pagination');
const db = require('../db/index');
const env = require('../config/settings');
const paginconfig = env.pagination;

const filterList = [];

var League = {

    //get single league
    getLeague(req, res) {
        var league = req.params.id;
        league = parseInt(league);



        var urlQuery = req.query;
        var whereQuery = pagin.createQuery(urlQuery, filterList);
        logger.info("Where query", whereQuery);
        return db.impactLeague.findAndCountAll({
            where: whereQuery,
            limit: paginconfig.SMALL,
            offset: (urlQuery.page == 0 || (isNaN(urlQuery.page)) ? 1 : urlQuery.page == 1) ? 0 : ((urlQuery.page - 1) * paginconfig.SMALL)

        })
            .then(league => {
                res.json(pagin.getPagination(league, req, paginconfig.SMALL));
            })
            .catch(err => {
                console.log("CAME in catch", err);
                throw new Error("PLease check URL");
            })

    }
}

module.exports = League;