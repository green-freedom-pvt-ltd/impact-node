// this file will contain all api related to Impact league

/**
Existing APIs
1. Create Impact league Team
2. Join League
3. Exit League
4. View League leaderboard
5. View Team leaderboard

6. Get causes specific to a league
7. allow captain to remove his team members

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


var checkTeamCode = function (team_code) {
    return new Promise(
        function (resolve, reject) {
            console.log('inside check team code--------', team_code);
            db.team.findAndCountAll({
                where: { team_code: team_code }
            })
                .then(team => {
                    if (team.rows[0] && team.rows[0].id) {
                        console.log('team----', team.rows.length);
                        const team_id = team.rows[0].id;
                        resolve(team_id); // fulfilled
                    } else {
                        var err = 'Please enter the correct team code';
                        reject(err); // reject
                    }
                });
        }
    )
};



var exitOtherLeagues = function (user_id) {
    return new Promise(
        function (resolve, reject) {
            console.log('inside check team code--------', user_id);
            db.employee.update(
                { is_logout: true },
                {
                    where: { user_id: user_id, is_logout: false }
                }
            )
                .then(updatedemployee => {
                    if (true) {
                        console.log('updatedemployee----', updatedemployee);
                        resolve(updatedemployee); // fulfilled
                    } else {
                        var err = 'Please enter the correct team code';
                        reject(err); // reject
                    }
                });
        }
    )
};



// var exitOtherLeagues = function (user_id) {
//     console.log("inside exit other leagues---------");
//     return Promise.resolve(
//         db.employee.update(
//             { is_logout: true },
//             {
//                 where: { user_id: user_id, is_logout: false }
//             }
//         ));
// };

// var myPromise = Promise(function(team_code){
//     console.log('inside check team code', team_code);
//     return false;
//  });


var league = {

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
                res.status(400).send({ error: 'Something failed! Contact the admin.' })
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
                res.status(400).send({ error: 'Something failed! Contact the admin.' })
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
                    res.status(400).send(err)
                    throw new Error(err);
                })
        } else {
            res.status(400).send({ error: 'please check all parameters again' });
        }
    },

    // checkTeamCode(team_code) {
    //     console.log('inside check team code', team_code);
    //     return false;
    // },


    // This API is responsible for adding a user in a team of a league
    // We allow a user to be present only in one league at one time
    // So before we add users to any team we logout the user from all other teams
    // and then create his entry in a new team or
    // if the user is simply joining the same team, we update is_logout=false
    joinTeam(req, res) {
        var req_body = req.body;
        const user_id = req.user_id;
        const team_code = req_body.team_code;
        // var team_valid = league.checkTeamCode(team_code);
        // checkTeamCode(team_code)
        //     .then((team_id) => {
        //         console.log("inside validate promise", team_id);
        //         res.status(200).send("valid team code " + team_id);
        //     })
        //     .then(exitOtherLeagues(user_id))
        //     .catch(err => {
        //         res.status(406).send(err);
        //         // throw new Error(err);
        //     });
        // add validation for checking the code in team table
        // if team code exists create a new employee for that user
        // if (validation) {
        console.log("now its safe to join a team---------", req_body, user_id);
        // check if the team code exists for any team
        db.team.findAndCountAll({
            where: { team_code: req_body["team_code"] }
        })
            .then(team => {
                if (team.rows[0] && team.rows[0].id) {
                    console.log('team----', team.rows.length);
                    const team_id = team.rows[0].id;
                    db.impactLeague.findAndCountAll({
                        where: { id: team.rows[0].impactleague_id }
                    }).then(implactleagues => {
                        // check if actual team size is less than mentioned size
                        console.log("implactleagues------", implactleagues.rows[0].team_size);
                        // logout users from all other team
                        db.employee.update(
                            { is_logout: true },
                            {
                                where: { user_id: user_id, is_logout: false }
                            }
                        ).then(
                            db.employee.findAndCountAll({
                                where: { is_logout: false, team_id: team_id }
                            }).then(employees => {
                                console.log('employeesssss----', employees.rows.length, implactleagues.rows[0].team_size);
                                if (employees.rows) {
                                    if (employees.rows.length < implactleagues.rows[0].team_size) {
                                        db.employee.findAndCountAll({
                                            where: { user_id: user_id, team_id: team_id }
                                        })
                                            .then(employee => {
                                                console.log('employee----', employee.rows.length);
                                                // add a new entry in employee for new user
                                                // required fields
                                                // company_id, team_id, user_id, is_logout
                                                // also add a check for team size
                                                if (employee.rows) {
                                                    if (employee.rows.length === 0) {
                                                        console.log("inside create employee");
                                                        var employee_data = {
                                                            company_id: implactleagues.rows[0].company_id,
                                                            team_id: team_id,
                                                            user_id: user_id,
                                                            is_logout: false
                                                        }
                                                        return db.employee.create(employee_data)
                                                            .then(employee => {
                                                                res.json(pagin.getPagination(employee, req, paginconfig.SMALL));
                                                            })
                                                            .catch(err => {
                                                                throw new Error(err);
                                                                res.status(406).send(err)
                                                            })
                                                    } else {
                                                        db.employee.update(
                                                            { is_logout: false },
                                                            {
                                                                where: { user_id: user_id, team_id: team_id }
                                                            }
                                                        ).then(
                                                            db.employee.findAndCountAll({
                                                                where: { user_id: user_id, team_id: team_id }
                                                            }).then(employee => {
                                                                res.json(pagin.getPagination(employee, req, paginconfig.SMALL));
                                                            })
                                                        );
                                                        console.log("user already logged in");
                                                        // res.send("everything is fine");
                                                    }
                                                } else {
                                                    console.log("create employee");
                                                    res.send("everything is fine");
                                                }
                                            })
                                            .catch(err => {
                                                res.status(406).send({ error: 'Something failed! Contact the admin.' })
                                                throw new Error(err);
                                            });
                                    } else {
                                        const teamfull_error = 'Team size is full, please join some other team';
                                        res.status(406).send({ teamfull_error });
                                        // throw new Error(teamfull_error);
                                    }
                                }
                            })
                                .catch(err => {
                                    res.status(406).send({ error: 'Something failed! Contact the admin.' })
                                    throw new Error(err);
                                })
                        )
                    });
                } else {
                    res.status(400).send("this code does not exist");
                }
            });
    },

    exitTeams(req, res) {
        var req_body = req.body;
        db.employee.update(
            { is_logout: true },
            {
                where: { user_id: req_body.user_id, team_id: req_body.team_id }
            }
        ).then(employee => {
            console.log('employee----', employee.rows);
            res.json(pagin.getPagination(employee, req, paginconfig.SMALL));
        }).catch(err => {
            res.status(406).send({ error: 'Something failed! Contact the admin.' })
            throw new Error(err);
        })
    }
}

module.exports = league;
