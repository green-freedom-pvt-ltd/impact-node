
// var config = require('config');
// var pagination = config.get('Customer.pagination');
const logger = require('../logger');
const pagin = require('../middleware/pagination');
const db = require('../db/index');
const env = require('../config/settings');
const paginconfig = env.pagination;

const baseUrl = 'http://localhost:3000/teams';

var Team = {
    getTeams(req, res) {
        var team = req.params.id;
        team = parseInt(team);
    
        if (team) {
            return db.team.findAndCountAll({
                where: {
                    id: team
                }
            })
                .then(team => {
                    var url = baseUrl + '/' + team;
                    res.json(pagin.getPagination(team, req.query, url, paginconfig.NORMAL));
                })
        }
        //get all runs
        else {
            return db.team.findAndCountAll(pagin.getOffset(paginconfig.SMALL, req.query))
                .then(team => {
                    // console.log("limit", pagination.NORMAL);
                    res.json(pagin.getPagination(team, req.query, baseUrl, paginconfig.SMALL));
                })
        }

    }
}


module.exports = Team;