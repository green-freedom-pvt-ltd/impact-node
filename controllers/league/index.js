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

async function checkTeamCode(team_code) {
    const team = await db.team.findAndCountAll({
        where: { team_code: team_code }
    })
    if (team.rows[0] && team.rows[0].id) {
        console.log('team----', team.rows.length, team.rows[0].id);
        const team_id = team.rows[0].id;
        return team.rows[0];
    } else {
        return false;
    }
};

async function exitOtherLeagues(user_id) {
    const updatedemployee = await db.employee.update(
        { is_logout: true },
        {
            where: { user_id: user_id, is_logout: false }
        }
    )
    return true;
};

async function getImpactLeague(impactleague_id) {
    const impact_league = await db.impactLeague.findAndCountAll({
        where: { id: impactleague_id }
    });
    return impact_league.rows[0];
};

async function getTeamMemberCount(team_id) {
    const team_members = await db.employee.findAndCountAll({
        where: { is_logout: false, team_id: team_id }
    })
    return team_members.rows.length;
};

async function updateEmployee(employee_data) {
    const re_login_reague = await db.employee.update(
        { is_logout: false },
        {
            where: { user_id: employee_data.user_id, team_id: employee_data.team_id }
        }
    );
    return true;
};

async function createEmployee(employee_data) {
    var new_employee = await db.employee.create(employee_data);
    return new_employee;
};

async function getSelfEmployee(employee_data) {
    const self_employee = await db.employee.findAndCountAll({
        where: { user_id: employee_data.user_id, team_id: employee_data.team_id }
    })
    return self_employee;
};

// add a new entry in existing_employee for new user
// required fields
// company_id, team_id, user_id, is_logout
// also add a check for team size
async function addEmployeeToTeam(employee_data) {
    const existing_employee = await db.employee.findAndCountAll({
        where: { user_id: employee_data.user_id, team_id: employee_data.team_id }
    })
    console.log('employee----', existing_employee.rows.length);
    if (existing_employee.rows && existing_employee.rows.length === 0) {
        console.log("inside create employee");
        const new_employee = await createEmployee(employee_data);
        return new_employee;
    } else {
        await updateEmployee(employee_data);
        const self_employee = await getSelfEmployee(employee_data);
        return self_employee;
    }
}

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

    // This API is responsible for adding a user in a team of a league
    // We allow a user to be present only in one league at one time
    // So before we add users to any team we logout the user from all other teams
    // and then create his entry in a new team or
    // if the user is simply joining the same team, we update is_logout=false
    // steps 
    // 1. check if the team code exists else throw error
    // 2. fetch impact league for the team
    // 3. check if team is empty else throw error
    // 4. logout user from all other leagues
    // 5. update if employee already exists for the user else create new
    async joinTeam(req, res) {
        const req_body = req.body;
        const user_id = req.user_id;
        const team_code = req_body.team_code;
        let impact_league;
        let team_limit;
        let time_size;
        // let logged_in_employee;
        const valid_team = await checkTeamCode(team_code);
        if (valid_team) {
            await exitOtherLeagues(user_id);
            impact_league = await getImpactLeague(valid_team.impactleague_id);
            team_limit = impact_league.team_size;
            team_size = await getTeamMemberCount(valid_team.id);
            if (team_size < team_limit) {
                var employee_data = {
                    company_id: impact_league.company_id,
                    team_id: valid_team.id,
                    user_id: user_id,
                    is_logout: false
                }
                const logged_in_employee = await addEmployeeToTeam(employee_data);
                console.log("after add employee");
                res.json(pagin.getPagination(logged_in_employee, req, paginconfig.SMALL));
            } else {
                res.status(400).send("Sorry, the team is full. Please join some other team");
            }
        } else {
            res.status(400).send("this code does not exist");
        }
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
