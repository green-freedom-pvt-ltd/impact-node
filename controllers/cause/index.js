var config = require('config');
const logger = require('../../logger');
const db = require('../../db/index');
const pagin = require('../../middleware/pagination');
const env = require('../../config/settings');
const paginconfig = env.pagination;
var Sequelize = require("sequelize");
var sequelize = db.sequelize;
const Op = Sequelize.Op
let _ = require('underscore');

const filterList = [];
const parameterTypes = {};


let get_cause_query = `SELECT c.*, cs.sponsors_id,sponsor.sponsor_id AS "sponsor.sponsor_id",sponsor.sponsor_logo AS "sponsor.sponsor_logo" 
FROM public.share_api_causes c JOIN share_api_causes_sponsors cs
ON c.cause_id= cs.causes_id 
LEFT JOIN share_api_sponsors sponsor
ON sponsor.id = cs.sponsors_id
LEFT JOIN share_api_company co
ON co.company_id = sponsor.sponsor_company_id
where c.is_active = true AND co.show_to_employees = true AND co.company_id =(select company_id from share_api_employee where user_id= 73 AND is_logout= false)
UNION 
SELECT c.*, cs.sponsors_id,sponsor.sponsor_id AS "sponsor.sponsor_id",sponsor.sponsor_logo AS "sponsor.sponsor_logo" 
FROM public.share_api_causes c JOIN share_api_causes_sponsors cs
ON c.cause_id= cs.causes_id 
LEFT JOIN share_api_sponsors sponsor
ON sponsor.id = cs.sponsors_id
LEFT JOIN share_api_company co
ON co.company_id = sponsor.sponsor_company_id
where c.is_active = true AND co.show_to_employees = false`




var causeModel = {
    getCauses1(req, res) {
        console.log("SPONSER");
        db.causes.findAll({
            include: [{
                model: db.CauseSponsor,
                include: [{
                    model: db.sponsors
                }]
            }],
            limit: 1
        })
            .then(causes => {
                causes.forEach(cause => {
                    cause.share_api_causes_sponsors.forEach(cause_sponsor => {
                        res.json(cause_sponsor.get());
                    }
                    );
                })
            })
    },

    getCauses(req, res) {
        return sequelize.query(get_cause_query,
            {
                // replacements: { limit: env.pagination.MEDIUM },
                nest: true,
                type: sequelize.QueryTypes.SELECT
            }
        )
            .then(result => res.json(result));
    }

}

module.exports = causeModel;