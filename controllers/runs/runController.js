
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
    is_flag: 'boolean'
};

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

    // Update runs 

    updateRun(req, res) {
        const workout = req.body;
        console.log("req...........", req.body);
        const workoutId = req.body;
        db.runs.update(
            { 
                distance: req.body.distance
            },
            {
                where:
                    { run_id: workoutId.run_id }
            }
        )
            .then(run => {
                db.runs.findAndCount({
                    where: { run_id: workout.run_id }
                }).then(run => {
                    // res.json(city);
                    res.status(201).send(run);
                });
            })
            .catch(error => res.status(400).send(error));
    }

}




module.exports = runModel;