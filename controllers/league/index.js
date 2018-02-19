// this file will contain all api related to Impact league

/**
Existing APIs
1. Create Impact league Team
2. Join League
3. Exit League
4. View League leaderboard
5. View Team leaderboard

6. Get causes specific to a league


New APIs
1. Create

*/



const logger = require('../../logger');
const pagin = require('../../middleware/pagination');
const db = require('../../db/index');
const env = require('../../config/settings');
const paginconfig = env.pagination;

const filterList = [];
const parameterTypes = {};

const team_filterList = [
    'impactleague_id',
    'team_name',
    'team_code',
    'invisible'
];

const team_parameterTypes = {
    impactleague_id: 'integer',
    team_name: 'string',
    team_code: 'string',
    invisible: 'boolean'
};

var league_fields = ["id", "impactleague_name", "impactleague_banner", "duration", "start_date", "end_date", "is_active", "team_size", "impactleague_banner_site", "impactleague_description_site", "email_type", "module", ["company_id", "company"]]
var team_fields = ["id", "impactleague_id", "team_name", "team_captain", "team_captain_email_id", "team_code", "team_captain_phone", "invisible"];

var League = {

    //get single league
    getLeague(req, res) {

        var urlQuery = req.query;
        try {
            var whereQuery = pagin.createQuery(urlQuery, filterList, parameterTypes);
        } catch (err) {
            // res.send({Error:err},400);
            res.status(400).send({ error: err })
            throw err;
        }
        return db.impactLeague.findAndCountAll({
            where: whereQuery,
            attributes: league_fields,
            limit: paginconfig.SMALL,
            offset: (urlQuery.page == 0 || (isNaN(urlQuery.page)) ? 1 : urlQuery.page == 1) ? 0 : ((urlQuery.page - 1) * paginconfig.SMALL)

        })
            .then(league => {
                res.json(pagin.getPagination(league, req, paginconfig.SMALL));
            })
            .catch(err => {
                res.status(500).send({ error: 'Something failed! Contact the admin.' })
                throw new Error(err);
            })

    },

    getTeams(req, res) {

        var urlQuery = req.query;
        try {
            var whereQuery = pagin.createQuery(urlQuery, team_filterList, team_parameterTypes);
        } catch (err) {
            // res.send({Error:err},400);
            res.status(400).send({ error: err })
            throw err;
        }
        return db.team.findAndCountAll({
            where: whereQuery,
            attributes: team_fields,
            limit: paginconfig.SMALL,
            offset: (urlQuery.page == 0 || (isNaN(urlQuery.page)) ? 1 : urlQuery.page == 1) ? 0 : ((urlQuery.page - 1) * paginconfig.SMALL)
        })
            .then(league => {
                res.json(pagin.getPagination(league, req, paginconfig.SMALL));
            })
            .catch(err => {
                res.status(500).send({ error: 'Something failed! Contact the admin.' })
                throw new Error(err);
            })

    },

    createTeams(req, res) {
        var req_body = req.body;
        var validation = pagin.validateReqBody(req_body, team_parameterTypes, team_fields);

        if (validation) {
            console.log("now its safe to create a team", req_body);
            return db.team.create(req_body)
                .then(league => {
                    res.json(pagin.getPagination(league, req, paginconfig.SMALL));
                })
                .catch(err => {
                    res.status(500).send(err)
                    throw new Error(err);
                })
        } else {
            res.status(500).send({ error: 'Something failed! Contact the admin.' })
        }
    },

    joinTeam(req, res) {
        var req_body = req.body;
        // add validation for checking the code in team table
        // if team code exists create a new employee for that user
        // if (validation) {
        console.log("now its safe to join a team", req_body);

        db.team.findAndCountAll({
            where: { team_code: req_body["team_code"] }
        })
            .then(team => {
                console.log('team----',team.rows[0].id);
            });

        // return db.employee.create(req_body)
        //     .then(league => {
        //         res.json(pagin.getPagination(league, req, paginconfig.SMALL));
        //     })
        //     .catch(err => {
        //         res.status(500).send(err)
        //         throw new Error(err);
        //     })
        res.send("everything is fine");
        // } else {
        // res.status(500).send({ error: 'Something failed! Contact the admin.' })
        // }
    }
}

module.exports = League;
