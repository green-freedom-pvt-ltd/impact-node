
var config = require('config');
const logger = require('../../logger');
const pagin = require('../../middleware/pagination');
const db = require('../../db/index');
const env = require('../../config/settings');
const paginconfig = env.pagination;

const filterList = [
    ['user_id_id', 'integer'],
    ['run_id', 'integer'],
    ['is_flag', 'boolean']
];





var runLocationModel = {

    //GET single runs
    getRunLocations(req, res) {
        var run_id = req.params.run_id;
        run_id = parseInt(run_id);

        var urlQuery = req.query;
        var whereQuery = pagin.createQuery(urlQuery, filterList);

        return db.runLocation.findAndCountAll({
            where: whereQuery,
            limit: paginconfig.SMALL,
            offset: (urlQuery.page == 0 || (isNaN(urlQuery.page)) ? 1 : urlQuery.page == 1) ? 0 : ((urlQuery.page - 1) * paginconfig.SMALL)

        })
            .then(runlocation => {
                //res.json(runlocation);
                res.json(pagin.getPagination(runlocation, req, paginconfig.SMALL));
            })
            .catch(err => {
                res.status(500).send({ error: 'Something failed! Contact the admin.' })
                throw new Error(err);
            })



    },

};


module.exports = runLocationModel;