var config = require('config');
const logger = require('../../logger');
const pagin = require('../../middleware/pagination');
var Sequelize = require("sequelize");
const db = require('../../db/index');
var sequelize = db.sequelize;
const Op = Sequelize.Op;
const env = require('../../config/settings');
const paginconfig = env.pagination;


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

// async function checkDuplicateWorkout1(req_data) {
//     let get_runs = await db.runs.all({
//         attributes: [[sequelize.fn('max', sequelize.col('end_time')), 'max_end_time']],
//         where: {
//             user_id_id: req_data.user_id_id
//         }
//     }).then(workout_time => JSON.parse(JSON.stringify(workout_time)))
//         .then((data) => {

//             console.log("workout_time", data[0].max_end_time);
//             return data[0];
//         }).catch((error) => {
//             return error;
//         })

//     let latest_workout_completion_date = new Date(get_runs);
//     let currnt_workout_start_date = new Date(req_data.start_time);
//     logger.info("currnt_workout_start_date", currnt_workout_start_date);
//     //logger.info("latest_workout_completion_date", latest_workout_completion_date, get_runs.rows[0]);

//     if (currnt_workout_start_date > latest_workout_completion_date) {
//         console.log("Condition is true");
//     }
//     else {
//         console.log("Condition is false");
//         return false;
//     }
// };

async function checkDuplicateWorkout(req_body) {
    console.log("Req body", req_body);
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
    let current_timestamp = {
        start_time: new Date(req_body.start_time),
        end_time: new Date(req_body.end_time)
    }
    time_stamp.push(current_timestamp);

    let final_time_stamp = time_stamp;
    var output = JSON.stringify(overlap(final_time_stamp), null, 2);
    return output;

};

async function checkLegue(end_time, user, team) {
    let check_league = await db.team.all({
        where: { id: team },
    })
        .then(teams => {
            var team_data = JSON.parse(JSON.stringify(teams));
            var league_id = team_data[0].impactleague_id
            let check_league_end = db.impactLeague.all({
                where: {
                    id: league_id
                },
            }).then(league => {
                var league_data = JSON.parse(JSON.stringify(league));
                var start_date = league_data[0].start_date;
                var end_league_date = new Date(league_data[0].end_date).toLocaleDateString();
                var end_run_date = new Date(end_time).toLocaleDateString();
                // var end_run_date = date.toLocaleDateString();
                console.log("workout_end_time", end_run_date, "league_end_date", end_league_date);
                console.log(end_run_date - end_league_date);
                // checking if workout is a part of league
                if (end_run_date >= end_league_date) {
                    console.log("come in if condition");
                    //If league has been over then logging out the user
                    return true;
                }
                else {
                    return false;
                }
            })
            return check_league_end;

        })
    return check_league;

}

function syncRun(post_run_data) {

    logger.info("post run after logging out from the league")
    return db.runs.create(
        post_run_data
    )
        .then(postRun => {
            return postRun;
            res.status(201).send(postRun);
        })
        .catch(error => {
            throw error;
            res.status(400).send(error);
        })
}

var runModel = {
    getRuns(req, res) {
        var urlQuery = req.query;
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

        //checking duplicate workout by time duration is already exist or not
        let get_data = await checkDuplicateWorkout(post_req_body);
      
        // If workout distance > 50 then flagging that workout
        if (post_req_body.distance > 50) {
            post_req_body.is_flag = true;
        }
        get_data = JSON.parse(get_data);
        if (!get_data.overlap) {
            if (team) {

                let check_league_is_over = await checkLegue(end_time, user, team);
                console.log("check_league_is_over", check_league_is_over);
                //Checking if league is going on or not
                if (check_league_is_over) {
                    post_req_body.team_id_id = null;
                }
                var post_data = await syncRun(post_req_body);
                if (post_data) {
                    res.status(201).send(post_data);
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
            let error = {};
            error.Error = "duplicate workouts present";
            error.workout_overlap = get_data.ranges
            res.status(401).send(error)

        }

    },

    postRun1(req, res) {

        var post_run_values = req.body;
        const run_start_time = post_run_values.start_time;
        const user = post_run_values.user_id_id;

        var version = new Date();
        post_run_values.version = version.getTime();
        post_run_values.start_time_epoch = Math.round(new Date(post_run_values.start_time).getTime() / 1000);
        post_run_values.end_time_epoch = Math.round(new Date(post_run_values.end_time).getTime() / 1000);

        // If workout distance > 50 then flagging that workout
        if (post_run_values.distance > 50) {
            if (!post_run_values.is_flag) {
                post_run_values.is_flag = true;
            }
        }

        // console.log("START TIME", run_start_time);
        // console.log("USER", user);
        // post_run_values = JSON.stringify(post_run_values);
        //console.log("USER", post_run_values);


        // Checking duplicate workout by user id and start time combination
        db.runs.count({
            where: {
                start_time: run_start_time,
                user_id_id: user,

            }
        })
            .then(run_count => {
                if (run_count === 0) {
                    db.runs.all({
                        attributes: [[sequelize.fn('max', sequelize.col('end_time')), 'max_end_time']],
                        where: {
                            user_id_id: user,
                        }
                    }).then(max_end_date => {
                        var latest_workout_end_date = JSON.parse(JSON.stringify(max_end_date));
                        latest_workout_end_date = new Date(latest_workout_end_date[0].max_end_time);
                        var current_workout_end_time = new Date(post_run_values.end_time);
                        console.log("MAXimum end workout", latest_workout_end_date);
                        console.log("latest_workout_end_date", latest_workout_end_date, "end_time", current_workout_end_time);
                        if (current_workout_end_time > latest_workout_end_date) {
                            // console.log("max End date",latest_workout_end_date);
                            // var isValidBody = pagin.validateReqBody(req.body,parameterTypes,fields);
                            // logger.info("Validate body",isValidBody);

                            //if team id present then will check here that league has been ended or not
                            if (post_run_values.team_id_id) {
                                db.team.all({
                                    where: { id: post_run_values.team_id_id },
                                })
                                    .then(teams => {
                                        var team_data = JSON.parse(JSON.stringify(teams));
                                        var league_id = team_data[0].impactleague_id

                                        db.impactLeague.all({
                                            where: {
                                                id: league_id
                                            },
                                        }).then(league => {
                                            var league_data = JSON.parse(JSON.stringify(league));
                                            var start_date = league_data[0].start_date;
                                            var end_league_date = new Date(league_data[0].end_date).toLocaleDateString();
                                            var end_run_date = new Date(post_run_values.end_time).toLocaleDateString();
                                            // var end_run_date = date.toLocaleDateString();
                                            console.log("workout_end_time", end_run_date, "league_end_date", end_league_date);
                                            console.log(end_run_date - end_league_date);
                                            if (end_run_date > end_league_date) {
                                                console.log("come in if condition");
                                                //If league has been over then logging out the user
                                                db.employee.update(
                                                    { is_logout: true },
                                                    {
                                                        where: { user_id: user, team_id: post_run_values.team_id_id }
                                                    }
                                                ).then(employee => {

                                                    logger.info("post run after logging out from the league")
                                                    return db.runs.create(
                                                        post_run_values
                                                    )
                                                        .then(postRun => {
                                                            res.status(201).send(postRun);
                                                        })
                                                        .catch(error => {
                                                            res.status(400).send(error);
                                                        })

                                                })

                                            }
                                            else {
                                                return db.runs.create(
                                                    post_run_values
                                                )
                                                    .then(postRun => {
                                                        res.status(201).send(postRun);
                                                    })
                                                    .catch(error => {
                                                        res.status(400).send(error);
                                                    })
                                            }
                                        })
                                    }
                                    )
                            }
                            else {
                                //console.log("post_run_values");
                                logger.info("Post run if team id not present");
                                return db.runs.create(
                                    post_run_values
                                )
                                    .then(postRun => {
                                        res.status(201).send(postRun);
                                    })
                                    .catch(error => {
                                        res.status(400).send(error);
                                    })
                            }
                        }
                        else {
                            console.log("Workout can't added at the same time");

                            res.status(401).send({ Error: "Workout can't added at the same time" });
                        }
                    })

                }
                else {
                    res.status(401).send({ Error: "Workout already exists" });
                }
            }

            )

    },
}


module.exports = runModel;