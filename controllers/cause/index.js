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
where c.is_active = true AND co.show_to_employees = false`;




let GET_ALL_CAUSE = `SELECT
c.cause_id,
c.cause_title,
c.is_active,
c.cause_brief,
c.cause_description,
c.cause_image,
c.conversion_rate,
c.min_distance,
share_api_causescategory.cause_category_name AS "cause_category",
c.cause_thank_you_image,
c.cause_share_message_template,
c.app_update_id,
c.order_priority,
c.amount,
c.is_completed,
c.cause_completed_image,
c.cause_completed_description_image,
c.cause_completed_share_message_template,
c.cause_completed_report,
sponsors.show_to_employees,
sponsors.id AS "sponsors.id",
sponsors.sponsor_type_name AS "sponsors.sponsor_type",
sponsors.sponsor_logo AS "sponsors.sponsor_logo",
sponsors.ngo_name AS "sponsors.sponsor_ngo",
sponsors.company_name AS "sponsors.sponsor_company",

partners.partner_type_name AS "partners.partner_type",
partners.ngo_name AS "partners.partner_ngo",
partners.partnered_on AS "partners.partnered_on",
partners.company_name AS "partners.partner_company",
partners.id AS "partners.partner_id",
cause_thank_you_image_v2.cause_thank_you_image AS "cause_thank_you_image_v2"
--cause_thank_you_image_v2.cause_thank_you_title AS "cause_thank_you_image_v2.cause_thank_you_title"
FROM
public.share_api_causes_sponsors cs
LEFT JOIN share_api_causes c ON cs.causes_id = c.cause_id
LEFT JOIN share_api_causescategory ON c.cause_category_id = share_api_causescategory.cause_category_id 
LEFT JOIN (
    SELECT
    json_agg(tnq.cause_thank_you_image),json_agg(tnq.cause_thank_you_title),
       json_agg(concat(tnq.cause_thank_you_image::text,'|',tnq.cause_thank_you_title::text)) "cause_thank_you_image",
       --json_agg(tnq.cause_thank_you_title) AS "cause_thank_you_title",
       cause_tnq.causes_id
    FROM
        share_api_causes_cause_thank_you_image_v2 cause_tnq
        JOIN share_api_causethankyouimage tnq ON cause_tnq.causethankyouimage_id = tnq.id group by cause_tnq.causes_id) cause_thank_you_image_v2 ON c.cause_id = cause_thank_you_image_v2.causes_id
LEFT JOIN (
    SELECT
        s.id,
        s.sponsor_logo,
        ngo.ngo_name,
        co.company_name,
        co.show_to_employees,
        st.sponsor_type_name
    FROM
        share_api_sponsors s
    LEFT JOIN share_api_company co ON s.sponsor_company_id = co.company_id
LEFT JOIN share_api_sponsortype st ON st.id = s.sponsor_type_id
LEFT JOIN share_api_ngos ngo ON s.sponsor_ngo_id = ngo.ngo_id) sponsors ON sponsors.id = cs.sponsors_id
JOIN (
SELECT
    p.id,
    p.partnered_on,
    p.partner_type_name,
    p.company_name,
    p.ngo_name,
    cp.causes_id
FROM
    share_api_causes_partners cp
LEFT JOIN (
    SELECT
        share_api_company.company_name,
        share_api_ngos.ngo_name,
        share_api_partnertype.partner_type_name,
        share_api_partners.id,
        share_api_partners.partnered_on
    FROM
        share_api_partners
    LEFT JOIN share_api_company ON share_api_partners.partner_company_id = share_api_company.company_id
LEFT JOIN share_api_ngos ON share_api_ngos.ngo_id = share_api_partners.partner_ngo_id
JOIN share_api_partnertype ON share_api_partnertype.id = share_api_partners.partner_type_id) p ON cp.partners_id = p.id) partners ON c.cause_id = partners.causes_id
WHERE
c.is_active = TRUE`


var URL_FOR_IMAGE = env.PROD_DOMAIN + 'media/'

let cause_thank_you_image_v2 = [["cause_thank_you_image", "image"], "cause_thank_you_title"];

function getSplitedData(data, mapping) {
    let splitted_data = [];
    //console.log("mapping", mapping);
    data.map((current, index) => {
        let partition_object = {}
        let partition = current.split('|');
        partition.map((part, partIndex) => {

            let temp = mapping[partIndex];
            if (temp[0].length > 1) {
                let getImage = getImagePath(part);
                partition_object[temp[0]] = getImage;
            }
            else {
                partition_object[temp] = part
            }

            //console.log("partition_object", partition_object);

        })
        splitted_data.push(partition_object);

    })

    // console.log("splitted_data", splitted_data);
    return splitted_data;
}

function getImagePath(image) {
    return URL_FOR_IMAGE + image;
}


var causeModel = {
    getCauses1(req, res) {




        db.causes.find({
            include: [
                {
                    model: db.sponsors,
                    nested: true
                }
            ]
        }).then(function (cause) {
            res.json(cause);
        });


        // console.log("SPONSER");
        // db.causes.findAll({
        //     include: [{
        //         model: db.CauseSponsor,
        //         include: [{
        //             model: db.sponsors
        //         }]
        //     }]

        // })
        //     .then(causes => {
        //         console.log(causes);
        //         res.json(causes)
        //         // causes.forEach(cause => {
        //         //     cause.share_api_causes_sponsors.forEach(cause_sponsor => {
        //         //         res.json(cause_sponsor.get());
        //         //     }
        //         //     );
        //         // })
        //     })
    },


    async getCauses(req, res) {
        let final_data = {};
        let cause_result = [];


        let exchange_rate = [
            {
                "currency": "USD",
                "rate": 65
            },
            {
                "currency": "CAD",
                "rate": 52
            },
            {
                "currency": "INR",
                "rate": 1
            },
            {
                "currency": "GBP",
                "rate": 86.11
            },
            {
                "currency": "EUR",
                "rate": 77.21
            },
            {
                "currency": "JPY",
                "rate": 0.58
            },
            {
                "currency": "AUD",
                "rate": 50.94
            },
            {
                "currency": "CHF",
                "rate": 66.83
            },
            {
                "currency": "CNY",
                "rate": 9.88
            },
            {
                "currency": "SEK",
                "rate": 8.04
            },
            {
                "currency": "NZD",
                "rate": 74.21
            },
            {
                "currency": "MXN",
                "rate": 3.48
            },
            {
                "currency": "SGD",
                "rate": 48.08
            },
            {
                "currency": "HKD",
                "rate": 8.34
            },
            {
                "currency": "NOK",
                "rate": 8.23
            },
            {
                "currency": "KRW",
                "rate": 0.06
            },
            {
                "currency": "TRY",
                "rate": 17.9
            },
            {
                "currency": "RUB",
                "rate": 1.13
            },
            {
                "currency": "BRL",
                "rate": 20.52
            },
            {
                "currency": "ZAR",
                "rate": 4.83
            }
        ]

        let get_overall_cause = await sequelize.query('select 1 as run_id, sum(run_amount) as overall,count(run_id) as run_count, sum(no_of_steps) as step_count from share_api_runs where is_flag=false', {
            type: sequelize.QueryTypes.SELECT
        })

        let result = await get_overall_cause;

        let get_causes = await sequelize.query(GET_ALL_CAUSE,
            {
                // replacements: { limit: env.pagination.MEDIUM },
                nest: true,
                type: sequelize.QueryTypes.SELECT
            }
        )
        let cause_response = JSON.parse(JSON.stringify(get_causes))

        
        //console.log(result);
        // .then(results=>{
        //     return results;
        // })
        // .catch(err=>{
        //     console.log("came in catch",err);
        //     return err;
        // })

        if (cause_response.length > 0 && get_overall_cause.length > 0) {
            let get_data = result[0];
            let new_value = cause_response.map((current, index) => {
                //  console.log("current", current);
                let cause = {};
                cause = current;
                //console.log("current", current.cause_thank_you_image_v2);
                let get_cause_images = getSplitedData(current.cause_thank_you_image_v2, cause_thank_you_image_v2);
                // console.log("get_cause_images", get_cause_images);
                cause["cause_thank_you_image_v2"] = get_cause_images;
                cause_result.push(cause)
                //console.log("cause", cause);

            })
            //  console.log("cause_result", cause_result);

            final_data.count = cause_response.length;


            final_data.results = cause_result;
            final_data["exchange_rates"] = exchange_rate;

            final_data["overall_impact"] = get_data.overall
            final_data["overall_num_steps"] = get_data.step_count;
            final_data["overall_num_runs"] = get_data.run_count;
            res.json(final_data);
        }
        else {
           logger.info("Data not came thought cause API",cause_response,result);
           res.status(403).send("Unable to get data. Please contact admin");
        }

        // res.json(cause_response);

    }

}

module.exports = causeModel;