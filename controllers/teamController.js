
// var config = require('config');
// var pagination = config.get('Customer.pagination');
const logger = require('../logger');
const pagin = require('../middleware/pagination');
const db = require('../db/index');
const env = require('../config/settings');
const paginconfig = env.pagination;

const filterList = [];


var Team = {
    getTeams(req, res) {
        var team = req.params.id;
        team = parseInt(team);
    
        var urlQuery = req.query;
        var whereQuery = pagin.createQuery(urlQuery, filterList);
      
        return db.team.findAndCountAll({
            where: whereQuery,
            limit: paginconfig.SMALL,
            offset: (urlQuery.page == 0 || (isNaN(urlQuery.page)) ? 1 : urlQuery.page == 1) ? 0 : ((urlQuery.page - 1) * paginconfig.SMALL)

        })
        .then(team => {
            res.json(pagin.getPagination(team, req,paginconfig.SMALL));
        })
        .catch(err =>{
            res.status(500).send({ error: 'Something failed! Contact the admin.' })
            throw new Error(err);
        })

    }
}


module.exports = Team;