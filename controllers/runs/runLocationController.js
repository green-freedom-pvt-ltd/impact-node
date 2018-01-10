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

    //GET all runs
    getRuns(req, res) {
        const run_id= req.query.run_id ||167308;

        return RunLocation.findAndCountAll({ where: { run_id_id: run_id } })
            .then(runs => {
                //runs = JSON.stringify(runs, null, 4);
                //runs = JSON.parse(runs);
              console.log(runs.rows[0].client_run_id);
              res.json(runs);
            })
          
    },

};


module.exports = runLocationModel;