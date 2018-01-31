
var config = require('config');
const logger = require('../../logger');
const pagin = require('../../middleware/pagination');
const db = require('../../db/index');
const env = require('../../config/settings');
const paginconfig = env.pagination;
var _ = require('underscore');


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
        var urlQuery = req.query;
        try {
            var whereQuery = pagin.createQuery(urlQuery, filterList, parameterTypes);
        } catch (err) {
            res.status(400).send({error:err})
            throw err;
        }
        return db.runLocation.findAndCountAll({
            where: whereQuery,
            limit: paginconfig.SMALL,
            offset: (urlQuery.page == 0 || (isNaN(urlQuery.page)) ? 1 : urlQuery.page == 1) ? 0 : ((urlQuery.page - 1) * paginconfig.SMALL)
        })
        .then(runlocation => {
            // This code parses the runlocation array list from string to array object 
            var parsedLocations = _.map(runlocation.rows, function(row){ 
                row.location_array = JSON.parse(row.location_array);
                return row; 
            });
            runlocation.rows=parsedLocations;
            res.json(pagin.getPagination(runlocation, req, paginconfig.SMALL));
        })
        .catch(err => {
            res.status(500).send({ error: 'Something failed! Contact the admin.' })
            throw new Error(err);
        })
    },
};


module.exports = runLocationModel;