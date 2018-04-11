
var config = require('config');
const logger = require('../../logger');
const pagin = require('../../middleware/pagination');
const db = require('../../db/index');
const env = require('../../config/settings');
const paginconfig = env.pagination;
var _ = require('underscore');
var Sequelize = require("sequelize");
var sequelize = db.sequelize;

const filterList = [
    'run_id_id',
    'run_location_id'
];


const parameterTypes = {
    run_id_id: 'integer',
    run_location_id: 'integer'
};

var runLocationModel = {
    //GET single runs
    getRunLocations(req, res) {
        let urlQuery = req.query;
        let LIMIT = paginconfig.SMALL;
        let attribute = [["run_id_id", "run_id"], "run_location_id", "client_run_id", "batch_num", "start_time_epoch", "end_time_epoch", "location_array"]
        const user = req.user_id;
        try {
            var whereQuery = pagin.createQuery(urlQuery, filterList, parameterTypes);
        } catch (err) {
            res.status(400).send({ error: err })
            throw err;
        }
        console.log("urlQuery", urlQuery);

        return db.runLocation.findAndCountAll({
            attributes: attribute,
            where: whereQuery,
            limit: LIMIT,
            order: [[sequelize.col("run_id_id"), "DESC"]],
            offset: (urlQuery.page == 0 || (isNaN(urlQuery.page)) ? 1 : urlQuery.page == 1) ? 0 : ((urlQuery.page - 1) * LIMIT)
        })
            .then(runlocation => {
                // This code parses the runlocation array list from string to array object 
                var parsedLocations = _.map(runlocation.rows, function (row) {
                    row.location_array = JSON.parse(row.location_array);
                    return row;
                });
                runlocation.rows = parsedLocations;
                res.json(pagin.getPagination(runlocation, req, LIMIT));
            })
            .catch(err => {
                res.status(500).send({ error: 'Something failed! Contact the admin.' })
                throw new Error(err);
            })
    }

};


module.exports = runLocationModel;