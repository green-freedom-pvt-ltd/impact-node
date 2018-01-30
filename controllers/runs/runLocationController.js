
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
            // var whereQuery = pagin.createQuery(urlQuery, filterList, parameterTypes);
        } catch (err) {
            // res.send({Error:err},400);
            res.status(400).send({error:err})
            throw err;
        }
        

        // console.log('whereQuery-----------------', whereQuery);
        return db.runLocation.findAndCountAll({
            where: whereQuery,
            limit: paginconfig.SMALL,
            offset: (urlQuery.page == 0 || (isNaN(urlQuery.page)) ? 1 : urlQuery.page == 1) ? 0 : ((urlQuery.page - 1) * paginconfig.SMALL)
        })
        .then(runlocation => {
            // res.json(runlocation);
            // console.log('runlocation-----------------', JSON.parse(runlocation.rows[0].location_array));
            var parsedLocations = _.map(runlocation.rows, function(row){ 
                // console.log('row--------------',row.location_array);
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