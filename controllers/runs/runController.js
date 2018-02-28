var config = require('config');
const logger = require('../../logger');
const pagin = require('../../middleware/pagination');

const db = require('../../db/index');
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
    "usain_bolt_count"]

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

    postRun(req, res) {
        var post_run_values = req.body;
        const run_start_time = post_run_values.start_time;
        const user = post_run_values.user_id_id;

        var version = new Date();
        post_run_values.version = version.getTime();
        post_run_values.start_time_epoch = Math.round(new Date(post_run_values.start_time).getTime() / 1000);
        post_run_values.end_time_epoch = Math.round(new Date(post_run_values.end_time).getTime() / 1000);

        console.log("START TIME", run_start_time);
        console.log("USER", user);
        // post_run_values = JSON.stringify(post_run_values);
        //console.log("USER", post_run_values);


        // Checking duplicate workout by user id and start time combination
        db.runs.count({
            where: {
                start_time: run_start_time,
                user_id_id: user
            }
        })
            .then(run_count => {
                if (run_count === 0) {
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
                                    var league_data = JSON.parse(JSON.stringify(league));;
                                    var start_date = league_data[0].start_date;
                                    var end_league_date = new Date(league_data[0].end_date).toLocaleDateString();
                                    var end_run_date = new Date(post_run_values.end_time).toLocaleDateString();
                                    // var end_run_date = date.toLocaleDateString();
                                    logger.info("workout_end_time", end_run_date, "league_end_date", end_league_date);

                                    if (end_run_date > end_league_date) {
                                        console.log("come in if condition");
                                        //If league has been over then logging out the user
                                        db.employee.update(
                                            { is_logout: true },
                                            {
                                                where: { user_id: user, team_id: post_run_values.team_id_id }
                                            }
                                        ).then(employee => {
                                            db.employee.findAndCount({
                                                where: { user_id: user, team_id: post_run_values.team_id_id }
                                            }).then(updatedEmployee => {
                                                // res.json(city);
                                                logger.info("updated values of employee", updatedEmployee)
                                            });
                                        })
                                            .catch(error => res.status(400).send(error));

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
                        console.log("post_run_values");
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
                    res.status(401).send("Workout already exists");
                }
            }

            )

    },
}


module.exports = runModel;