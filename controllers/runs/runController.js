
var config = require('config');
const logger = require('../../logger');
const pagin = require('../../middleware/pagination');
const db = require('../../db/index');
const baseUrl = 'http://localhost:3000/runs';
const env = require('../../config/settings');
const paginconfig = env.pagination;

const filterList = ['user_id_id', 'run_id', 'is_flag'];



var runModel = {
    getRuns(req, res) {

        var urlQuery = req.query;
        var whereQuery = pagin.createQuery(urlQuery, filterList);
     
        return db.runs.findAndCountAll({
            where: whereQuery,
            limit: paginconfig.SMALL,
            offset: (urlQuery.page == 0 || (isNaN(urlQuery.page))?1:urlQuery.page == 1) ? 0: ((urlQuery.page - 1) * paginconfig.SMALL)
         
        })
        .then(runs => {
            res.json(pagin.getPagination(runs, req, baseUrl, paginconfig.SMALL));
        })
        .catch(err =>{
            console.log("CAME in catch");
            throw new Error("PLease check URL");
        })
    },
    
}


module.exports = runModel;