
// var config = require('config');
// var pagination = config.get('Customer.pagination');
const logger = require('../logger');
const pagin = require('../middleware/pagination');
const db = require('../db/index');
const env = require('../config/settings');
const paginconfig = env.pagination;

const filterList = ['impactleague_id']; 

const parameterTypes = {
    impactleague_id: 'integer'
};

var fields= ["id",["impactleague_id","impactleague"], "team_name", "team_captain", "team_captain_email_id", "team_code", "team_captain_phone"];

var Team = {
    getTeams(req, res) {
        var urlQuery = req.query;
        try {
            var whereQuery = pagin.createQuery(urlQuery, filterList, parameterTypes);
        } catch (err) {
            // res.send({Error:err},400);
            res.status(400).send({error:err})
            throw err;
        }
        return db.team.findAndCountAll({
            where: whereQuery,
            attributes:fields,
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