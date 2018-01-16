
var config = require('config');
const logger = require('../../logger');
const pagin = require('../../middleware/pagination');
const db = require('../../db/index');
const env = require('../../config/settings');
const paginconfig = env.pagination;



const baseUrl = 'http://localhost:3000/runLocation';



var runLocationModel = {

    //GET single runs
    getRunLocations(req, res) {
        var run_id = req.params.run_id;
        run_id = parseInt(run_id);
        if (run_id) {
            return db.runLocation.findAndCountAll({ where: { run_id_id: run_id } }, pagin.getOffset(paginconfig.SMALL, req.query))
                .then(runs => {
                    res.json(pagin.getPagination(runs, req.query, baseUrl,paginconfig.SMALL));
                })
        }
        //get all runs
        else {
            return db.runLocation.findAndCountAll(pagin.getOffset(paginconfig.SMALL, req.query))
                .then(runs => {
                    
                    res.json(pagin.getPagination(runs, req.query, baseUrl,paginconfig.SMALL));
                })
        }


    },

};


module.exports = runLocationModel;