var config = require('config');
const logger = require('../../logger');
const pagin = require('../../middleware/pagination');
var Sequelize = require("sequelize");
const db = require('../../db/index');
var sequelize = db.sequelize;
const Op = Sequelize.Op;
const env = require('../../config/settings');
const paginconfig = env.pagination;
const _ = require("underscore");
const validator = require('validator');


const filterList = [
    'user_id_id',
    'run_id',
    'is_flag',
];

const parameterTypes = {
    user_id_id: 'integer',
    run_id: 'integer',
    is_flag: 'boolean',
    is_ios: 'boolean',
    distance: 'float',
    run_amount: 'integer',
    num_updates: 'integer',
    cause_run_title_id: 'integer',
    team_id_id: 'integer',
    client_run_id: 'hexa-decimal',
    cause_run_title: "string",
    cause_id_id: 'integer',
    start_time: 'string',
    end_time: 'string',
    run_duration: 'string'

};
const fields = ["start_location_lat", "start_location_long", "start_time", "cause_run_title",
    "end_time", "avg_speed", "end_location_lat", "end_location_long", "distance",
    "peak_speed", "calories_burnt", "cause_run_title_id", "user_id_id", "run_amount",
    "run_duration", "no_of_steps", "is_flag", "is_ios", "client_run_id", "version",
    "end_time_epoch", "run_duration_epoch", "start_time_epoch", "team_id_id",
    "num_spikes", "app_version", "device_id", "device_name", "num_updates",
    "os_version", "cause_id_id", "estimated_calories", "estimated_distance",
    "estimated_steps", "google_fit_distance", "google_fit_steps", "step_counter",
    "usain_bolt_count"];




let get_cause_from_company = `SELECT c.cause_id,c.cause_title,c.is_active,c.is_completed,c.cause_category_id, s.id,co.company_id, co.company_name,co.is_active,co.show_to_employees
FROM public.share_api_causes_sponsors cs 
JOIN share_api_causes c
on cs.causes_id= c.cause_id
JOIN share_api_sponsors s
on s.id = cs.sponsors_id
JOIN share_api_company co 
ON  co.company_id = s.sponsor_company_id
where c.is_active = true AND co.company_id=:companyId`

// this function takes an array of date ranges in this format:
// [{ start: Date, end: Date}]
// the array is first sorted, and then checked for any overlap

function overlap(dateRanges) {

    var sortedRanges = dateRanges.sort((previous, current) => {

        // get the start date from previous and current
        var previousTime = new Date(previous.start_time).getTime();
        // console.log("previous Time", previousTime);
        var currentTime = new Date(current.start_time).getTime();

        // if the previous is earlier than the current
        if (previousTime < currentTime) {
            return -1;
        }

        // if the previous time is the same as the current time
        if (previousTime === currentTime) {
            return 0;
        }

        // if the previous time is later than the current time
        return 1;
    });

    var result = sortedRanges.reduce((result, current, idx, arr) => {

        // get the previous range
        if (idx === 0) { return result; }
        var previous = arr[idx - 1];

        // check for any overlap
        var previousEnd = new Date(previous.end_time).getTime();
        var currentStart = new Date(current.start_time).getTime();
        var overlap = (previousEnd >= currentStart);

        // store the result
        if (overlap) {
            // yes, there is overlap
            result.overlap = true;
            // store the specific ranges that overlap
            result.ranges.push({
                previous: previous,
                current: current
            })
        }

        return result;

        // seed the reduce  
    }, { overlap: false, ranges: [] });


    // return the final results  
    return result;
}


async function checkDuplicateWorkout(req_body) {
    //console.log("Req body", req_body);
    let current_date = new Date("Mar 19, 2018").setHours(5, 30);

    console.log("current date", current_date);

    let getTimestamp = await db.runs.all({
        attributes: ['run_id', 'start_time', 'end_time'],
        where: {
            user_id_id: req_body.user_id_id,
            start_time: {
                $gte: current_date
            }
        }
    })


    let time_stamp = await JSON.parse(JSON.stringify(getTimestamp, null, 2));
    console.log("time_stamp", time_stamp);

    let current_timestamp = {
        start_time: new Date(req_body.start_time),
        end_time: new Date(req_body.end_time)
    }
    time_stamp.push(current_timestamp);

    let final_time_stamp = time_stamp;
    var output = JSON.stringify(overlap(final_time_stamp), null, 2);
    console.log("output", output);
    return output;

};

async function checkLegue(start_time, user, team) {
    try {
        // console.log("Came in checkLegue");
        return await db.team.all({
            where: { id: team },
        })
            .then(teams => {
                console.log("Came in team length is zero", teams.length, teams.length ? "yes" : "no");
                //Checking if team id is available/valid or not
                if (teams.length === 0) {
                    //   console.log("Came in team length is zero");
                    return "Team Id not available";
                }
                var team_data = JSON.parse(JSON.stringify(teams));
                var league_id = team_data[0].impactleague_id

                //Checking league is in-progress or not
                let check_league_end = db.impactLeague.all({
                    where: {
                        id: league_id
                    },
                }).then(league => {
                    var league_data = JSON.parse(JSON.stringify(league));
                    // var start_date = league_data[0].start_date;
                    var end_league_date = new Date(league_data[0].end_date).toLocaleDateString();
                    var start_league_date = new Date(league_data[0].start_date).toLocaleDateString();
                    let workout_start_time = new Date(start_time).toLocaleDateString();

                    //console.log("start_league_date", start_league_date, "workout_start_time", workout_start_time, "league_end_date", end_league_date);

                    // checking if workout is a part of league
                    if (start_league_date <= workout_start_time && workout_start_time <= end_league_date) {
                        //If league has been over then logging out the user
                        return [true, league_data[0]];
                    }
                    else {
                        return [false];
                    }
                })
                return check_league_end;

            }).catch((error) => {
                return error;

            })
    } catch (error) {
        console.error("error", error);
    }

    // return check_league;
}

function syncRun(post_run_data) {

    logger.info("post run after logging out from the league")
    return db.runs.create(
        post_run_data
    )
        .then(postRun => {
            return postRun;
            //res.status(201).send(postRun);
        })
        .catch(error => {
            throw error;
            res.status(400).send(error);
        })

}

async function checkCauseIsPublic(company, current_cause) {

    let cause_data = await sequelize.query(get_cause_from_company,
        {
            replacements: { companyId: company },
            type: sequelize.QueryTypes.SELECT
        }
    )
        .then(causes => {

            let result = _.map(causes, (cause) => {
                if (cause.cause_id == current_cause) {
                    return true;
                }
                else {
                    // console.log("result !!!", cause);
                    return false;
                }
            })
            // console.log("result", result);
            return result[0];

        })
    //console.log(cause_data);
    return cause_data;
}



function update_workout(data, run) {
    return db.runs.update(data, {
        where: {
            run_id: run
        }
    }).then(update_result => {
        if (update_result) {
            return update_result;
        }
    })
        .catch((error) => {
            logger.error("error occured while updating workout", error);
            return "error occured while updating workout";
        })
}


function leagueLeaderboard(data, league, update = false) {

    db.teamleaderboard.findAll({
        where: {
            user_id: data.user_id_id,
            team_id: data.team_id_id
        }
    })
        .then(async (res) => {
            let response = JSON.parse(JSON.stringify(res));
            // console.log("Response", response[0].total_amount, data.run_amount);
            let workout_amount = parseInt(response[0].total_amount) + parseInt(data.run_amount);
            let count = update ? parseInt(response[0].run_count) : parseInt(response[0].run_count) + 1;

            if (!league.allow_all_cause) {
                let check_cause = await checkCauseIsPublic(league.company_id, data.cause_id_id);

                // console.log("check_cause", check_cause);
                if (check_cause) {
                    db.teamleaderboard.update({
                        total_amount: workout_amount,
                        run_count: count
                    },
                        {
                            where: {
                                team_id: response[0].team_id,
                                user_id: response[0].user_id
                            }
                        }
                    ).then((resp) => {
                        return resp;
                    })
                }
                else {
                    logger.info("user is not runninig on their company's cause so won't add in league");
                    return "user is not runninig on their company's cause so won't add in league";
                }
            }
            else {
                db.teamleaderboard.update({
                    total_amount: workout_amount,
                    run_count: count
                },
                    {
                        where: {
                            team_id: response[0].team_id,
                            user_id: response[0].user_id
                        }
                    }
                ).then((resp) => {
                    console.log("resp..........");
                })
            }
        })
        .catch((err) => {
            logger.error("Error while adding run in league leaderboard", err);
            return err;
        })
}

var runModel = {
    async getRuns(req, res) {
        var urlQuery = req.query;
        let user = req.user_id;
        let LIMIT = paginconfig.NORMAL
        if (urlQuery.is_flag || urlQuery.client_version) {

            if (urlQuery.is_flag == "true") {

                if (parseInt(urlQuery.page) && parseInt(urlQuery.page) > 0 || urlQuery.is_flag == "true") {
                    return db.runs.findAndCountAll({
                        where: {
                            is_flag: true,
                            user_id_id: user
                        },
                        order: [[sequelize.col("start_time"), "DESC"]],
                        limit: LIMIT,
                        offset: (urlQuery.page == 0 || (isNaN(urlQuery.page)) ? 1 : urlQuery.page == 1) ? 0 : ((urlQuery.page - 1) * LIMIT)
                    })
                        .then((result) => {
                            let paginate = pagin.getPagination(result, req, LIMIT);
                            res.status(200).send(paginate);
                        })
                }
                else {
                    res.status(400).send({
                        "error": "please enter valid parameter in url query string"
                    });
                }
            }
            else if (urlQuery.is_flag == "all") {
                if (parseInt(urlQuery.page) && parseInt(urlQuery.page) > 0 || urlQuery.is_flag == "all") {
                    return db.runs.findAndCountAll({
                        where: { user_id_id: user },
                        order: [[sequelize.col("start_time"), "DESC"]],
                        limit: LIMIT,
                        offset: (urlQuery.page == 0 || (isNaN(urlQuery.page)) ? 1 : urlQuery.page == 1) ? 0 : ((urlQuery.page - 1) * LIMIT)
                    })
                        .then((result) => {
                            let paginate = pagin.getPagination(result, req, LIMIT);
                            res.status(200).send(paginate);
                        })

                }
                else {
                    res.status(400).send({
                        "error": "please enter valid parameter in url query string"
                    });
                }
            }

            else {
                if (parseInt(urlQuery.page) && parseInt(urlQuery.page) > 0 || urlQuery.client_version) {
                    return db.runs.findAndCountAll({
                        where: {
                            user_id_id: user,
                            version: {
                                [Op.gt]: urlQuery.client_version
                            }
                        },
                        order: [[sequelize.col('version'), 'desc']],
                        limit: LIMIT,
                        offset: (urlQuery.page == 0 || (isNaN(urlQuery.page)) ? 1 : urlQuery.page == 1) ? 0 : ((urlQuery.page - 1) * LIMIT)

                    })
                        .then((result) => {
                            let paginate = pagin.getPagination(result, req, LIMIT);
                            res.status(200).send(paginate);
                        })
                        .catch((err) => {
                            logger.error(err);
                            res.status(400).send({
                                'error': 'Something failed! Contact the admin.'
                            });
                        })
                }
                else {
                    res.status(400).send({
                        "error": "please enter valid parameter in url query string"
                    });
                }
            }
        }


        try {
            var whereQuery = pagin.createQuery(urlQuery, filterList, parameterTypes);
        } catch (err) {
            // res.send({Error:err},400);
            res.status(400).send({ error: err })
            throw err;
        }
        return db.runs.findAndCountAll({
            where: whereQuery,
            limit: paginconfig.SMALL,
            offset: (urlQuery.page == 0 || (isNaN(urlQuery.page)) ? 1 : urlQuery.page == 1) ? 0 : ((urlQuery.page - 1) * paginconfig.SMALL)
        })
            .then(runs => {
                res.json(pagin.getPagination(runs, req, paginconfig.SMALL));
            })
            .catch(err => {
                res.status(500).send({ error: 'Something failed! Contact the admin.' })
                throw new Error(err);
            })
    },

    // This API is responsible for post the run 
    async postRun(req, res) {
        let post_req_body = req.body;
        const start_time = post_req_body.start_time;
        const end_time = post_req_body.end_time;
        const user = post_req_body.user_id_id;
        const team = post_req_body.team_id_id;


        //Adding current time in the version field
        var version = new Date();
        post_req_body.version = version.getTime();

        //checking duplicate workout by time duration is already exist or not
        let get_data = await checkDuplicateWorkout(post_req_body);

        // If workout distance > 50 then flagging that workout
        if (post_req_body.distance > 50) {
            post_req_body.is_flag = true;
        }
        get_data = JSON.parse(get_data);

        if (!get_data.overlap) {
            if (team) {

                let check_workout_is_in_league = await checkLegue(start_time, user, team);

                console.log("check_workout_is_in_league", check_workout_is_in_league);
                //Checking if league is going on or not

                if (!check_workout_is_in_league[0]) {

                    post_req_body.team_id_id = null;
                }
                try {
                    var post_data = await syncRun(post_req_body);

                    if (post_data) {

                        /*Checking team id, if not null means league is in-progress 
                        then adding amount with team id*/

                        if (post_req_body.team_id_id && !post_req_body.is_flag) {

                            await leagueLeaderboard(post_data, check_workout_is_in_league[1]);   //Adding data into league leaderboard table 
                        }
                        res.status(201).send(post_data);
                    }
                }
                catch (err) {
                    res.status(401).send(err);
                }
            }
            else {
                var post_data = await syncRun(post_req_body);
                if (post_data) {
                    res.status(201).send(post_data);
                }
            }
        }
        else {

            console.log("get data", get_data);
            let error = {};
            let workout_overlap = get_data.ranges
            error.error = "duplicate workouts present";
            error.result = workout_overlap
            res.status(401).send(error)
        }
    },

    async updateRun(req, res) {
        let update_data = req.body;
        let user = req.user_id;
        //   console.log("run id", req.params.id);
        let run_id = req.params.id ? req.params.id : update_data.run_id;

        // console.log("UPDATE", update_data);

        //created new object for columns which will update
        let update_object = {};
        if (update_data.distance)
            update_object.distance = update_data.distance;
        if (update_data.run_amount)
            update_object.run_amount = update_data.run_amount;
        if (update_data.cause_id)
            update_object.cause_id_id = update_data.cause_id;
        if (typeof update_data.is_flag === 'boolean')
            update_object.is_flag = update_data.is_flag;

        // console.log("update_object", update_object)
        // console.log("run id", run_id);

        if (run_id) {
            let run_data = await db.runs.all({
                where: {
                    run_id: run_id
                }
            })
                .then(run => {
                    // console.log("RUN", run[0].get());
                    return run[0].get();
                })
            console.log(run_data.start_time, user, run_data.team_id_id)

            if (run_data.team_id_id) {
                let check_workout_is_in_league = await checkLegue(run_data.start_time, user, run_data.team_id_id);
                console.log(check_workout_is_in_league);
                if (!check_workout_is_in_league[0]) {
                    //  console.log("update_object", update_object);
                    let isUpdate = await update_workout(update_object, run_id);

                    if (isUpdate[0] > 0) {
                        res.status(200).send("Workout updated successfully");
                    }
                }
                else if (check_workout_is_in_league[0] == true) {
                    let isUpdate = await update_workout(update_object, run_id);
                    if (isUpdate[0] > 0) {
                        res.status(200).send("Workout updated successfully");
                    }
                    let flagReduction = run_data;
                    let league_update = false;
                    if (update_data.distance != run_data.distance || update_data.run_amount != run_data.run_amount) {
                        if (update_data.distance || update_data.run_amount) {
                            flagReduction.distance = (update_data.distance - flagReduction.distance)
                            flagReduction.run_amount = (update_data.run_amount - flagReduction.run_amount)
                            league_update = true;
                        }
                    }

                    if (update_data.is_flag != run_data.is_flag) {
                        if (update_data.is_flag == true) {

                            flagReduction.distance = -(flagReduction.distance);
                            flagReduction.run_amount = -(flagReduction.run_amount);
                            league_update = true;
                        }

                    }

                    let update_league = league_update ? await leagueLeaderboard(flagReduction, check_workout_is_in_league[1], true) : "No need to update league";   //Adding data into league leaderboard table 
                    // console.log("update_league", update_league);
                }
                else {

                }
            }
            else {
                let isUpdate = await update_workout(update_object, run_id);

                if (isUpdate[0] > 0) {
                    res.status(200).send("Workout updated successfully");
                }
            }




        }




    }

}


module.exports = runModel;