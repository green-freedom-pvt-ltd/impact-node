var Sequelize = require("sequelize");
var config = require('config');
var sequilizeConfig = config.get('Customer.sequilize');
var dbConfig = config.get('Customer.dbConfig');
const logger = require('../../logger');
const pagination = config.get('Customer.pagination');


var sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
    host: dbConfig.host,
    dialect: sequilizeConfig.dialect,
    pool: sequilizeConfig.pool,
});
const RunLocation = sequelize.import("../../models/share_api_runlocations.js");

//   const baseUrl = 'http://localhost:3000/user';



var runLocationModel = {

    //GET single runs
    getRuns(req, res) {
        var run_id = req.params.run_id;
        run_id = parseInt(run_id);
        if(run_id){
            return RunLocation.findAndCountAll({ where: { run_id_id: run_id } }, { order: [sequelize.col('batch_num')] })
            .then(runs => {
                res.json(runs);
            })
        }
        //get all runs
        else{
            return RunLocation.findAndCountAll({limit:pagination.SMALL})
            .then(runs => {
                res.json(runs);
            })
        }
        

    },

};


module.exports = runLocationModel;