
var config = require('config');
const logger = require('../../logger');
const pagin = require('../../middleware/pagination');
const db = require('../../db/index');
const baseUrl = 'http://localhost:3000/runs';
const env = require('../../config/settings');
const paginconfig = env.pagination;




var runModel = {
    getRuns(req, res) {
        var run_id = req.params.run_id;
        var user_id= req.query.user_id;
        var client_id=req.query.client_id;
        var is_flag = req.query.is_flag;
     
        if(user_id){
            return db.runs.findAndCountAll({ where: { user_id_id: user_id } })
                .then(runs => {
                  
                    res.json(runs);
                })
        }
        if(client_id){
            return db.runs.findAndCountAll({ where: { client_run_id: client_id } })
                .then(runs => {
                  
                    res.json(runs);
                })
        }
        if(is_flag){
            return db.runs.findAndCountAll({ where: { is_flag: is_flag },limit:paginconfig.SMALL })
                .then(runs => {
                  
                    res.json(runs);
                })
        }
        // console.log("cominggggg......");
        run_id = parseInt(run_id);
        if (run_id) {
            return db.runs.findAndCountAll({ where: { run_id: run_id },limit:paginconfig.SMALL})
                .then(runs => {
                    res.json(runs);
                })
        }
        //get all runs
        
        if(req.query)
        {
            console.log("REQ...",req.query);
            return db.runs.findAndCountAll({where:req.query,limit:paginconfig.SMALL})
                .then(runs => {
                    res.json(pagin.getPagination(runs, req.query, baseUrl,paginconfig.SMALL));
                })
        }
    },
    
}


module.exports = runModel;