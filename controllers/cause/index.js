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




let GET_ALL_CAUSE = `SELECT c.cause_id,
c.cause_title,
c.is_active,
c.cause_brief,
c.cause_description,
c.cause_image,
c.conversion_rate,
c.min_distance,
string_agg(DISTINCT cc.cause_category_name,',') AS "cause_category",
array_agg(DISTINCT co.show_to_employees),
c.cause_thank_you_image,
c.cause_share_message_template,
c.app_update_id,
c.order_priority,
c.amount,
c.is_completed,
c.cause_completed_image,
c.cause_completed_description_image,
c.cause_completed_share_message_template,
json_agg(s.sponsor) AS sponsors,
json_agg(p.partner) AS partners,
json_agg(c_t_image.cause_thanks_image) AS cause_thank_you_image_v2
FROM public.share_api_causes c JOIN share_api_causes_sponsors cs
ON c.cause_id= cs.causes_id 
LEFT JOIN (

SELECT 
sp.id,
sp.sponsor_logo,
sp.sponsor_company_id,
json_agg(com.company_name),
json_agg(ngo.ngo_name),
json_agg(st.sponsor_type_name),
array_agg(concat(sp.id::text, '|', st.sponsor_type_name::text, '|',com.company_name::text, '|', ngo.ngo_name::text, '|', sp.sponsor_logo::text)) AS "sponsor"
from 
share_api_sponsors sp
JOIN share_api_company com ON sp.sponsor_company_id = com.company_id
LEFT JOIN share_api_ngos ngo ON sp.sponsor_ngo_id = ngo.ngo_id
LEFT JOIN share_api_sponsortype st on st.id = sp.sponsor_type_id
group by sp.id
) s
ON s.id = cs.sponsors_id
LEFT JOIN share_api_company co
ON co.company_id = s.sponsor_company_id
LEFT JOIN share_api_causes_partners cp
ON c.cause_id = cp.causes_id
LEFT JOIN (
SELECT 
pa.id,
    pa.partnered_on,
json_agg(com.company_name),
json_agg(ngo.ngo_name),
json_agg(ptype.partner_type_name),
json_agg (concat(pa.id::text, '|',  ptype.partner_type_name, '|', com.company_name, '|',ngo.ngo_name , '|', pa.partnered_on)) AS "partner"
from share_api_partners pa
LEFT JOIN share_api_company com ON pa.partner_company_id = com.company_id
LEFT JOIN share_api_ngos ngo ON pa.partner_ngo_id = ngo.ngo_id
LEFT JOIN share_api_partnertype ptype ON pa.partner_type_id = ptype.id 
GROUP BY pa.id

) p
ON p.id = cp.partners_id
LEFT JOIN share_api_causes_cause_thank_you_image_v2 CTI
ON c.cause_id = CTI.causes_id
LEFT JOIN (
SELECT
cause_tnq.id,
cause_tnq.cause_thank_you_image,
cause_tnq.cause_thank_you_title,
json_agg (concat(cause_tnq.id :: text,'|',cause_thank_you_image::text, '|', cause_thank_you_title::text)) "cause_thanks_image" --json_agg(tnq.cause_thank_you_title) AS "cause_thank_you_title",
FROM
share_api_causethankyouimage cause_tnq
GROUP BY
cause_tnq.id) c_t_image ON c_t_image.id = CTI.causethankyouimage_id
LEFT JOIN share_api_causescategory cc ON c.cause_category_id = cc.cause_category_id
where c.is_active = true AND co.company_id in ( select company_id from share_api_company where show_to_employees = false 
union
select company_id from share_api_employee where user_id=:user AND is_logout= false)
group by c.cause_id
order by c.order_priority;`


let getCauseRaisedQuery = 'select 1 as row_id, sum(run_amount) as amount_raised,count(run_id) as total_runs from share_api_runs where is_flag=false AND cause_id_id = :cause_id';


var URL_FOR_IMAGE = env.PROD_DOMAIN + 'media/'

let cause_thank_you_image_v2 = ["id", ["cause_thank_you_image", "image"], "cause_thank_you_title"];
let partners_array = ["partner_id", "partner_type", "partner_company", "partner_ngo", "partnered_on"];
let sponsors_array = ["sponsor_id", "sponsor_type", "sponsor_company", "sponsor_ngo", ["sponsor_logo", "image"]];


function getSplitedData(data, mapping) {
    let data_id = [];
    // console.log("DATA", data);
    let splitted_data = [];
    //console.log("mapping", mapping);
    data.map(data_result => {
        data_result.map((current, index) => {
            // console.log("current123", current);
            let partition_object = {}

            let partition = current.split('|');
            // console.log("data_id.length", data_id.length);
            if (data_id.length > 0) {
                // comparing current ID(sponsors,partners) with the data_id array
                // IF Found then return from current loop 
                let find_id = _.find(data_id,
                    function (num) {
                        // console.log("num", num, partition[0]);
                        return num == partition[0]
                    });
                // console.log("find_id", find_id);
                if (find_id) {
                    return;
                }

            }
            // Storing ID of objects(sponsors,partners etc.) to check uniqueness 
            data_id.push(partition[0]);
            // console.log("data_id", data_id);
            partition.map((part, partIndex) => {
                // console.log("mapping[partIndex]", part, mapping[partIndex]);
                let temp = mapping[partIndex];
                if (temp[0].length > 1) {
                    let getImage = getImagePath(part);
                    partition_object[temp[0]] = getImage;
                }
                else {
                    partition_object[temp] = part == "" ? null : part;
                }

                //console.log("partition_object", partition_object);

            })
            splitted_data.push(partition_object);

        })
    })


    // console.log("splitted_data", splitted_data);
    return splitted_data;
}

function getImagePath(image) {
    return URL_FOR_IMAGE + image;
}


async function getRaisedData(id) {
    let get_cause_raised_amount = await sequelize.query(getCauseRaisedQuery, {
        type: sequelize.QueryTypes.SELECT,
        replacements: { cause_id: id }
    });

    let total_cause_amount = await get_cause_raised_amount;
   // console.log("total_cause_amount", total_cause_amount);
    return total_cause_amount
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
                replacements: { user:req.user_id||null },
                nest: true,
                type: sequelize.QueryTypes.SELECT
            }
        )
        let cause_response = JSON.parse(JSON.stringify(get_causes))


        if (cause_response.length > 0 && get_overall_cause.length > 0) {
            let get_data = result[0];
            for (let i = 0; i < cause_response.length; i++) {
                let current = cause_response[i];

                let total_cause_amount = await getRaisedData(current.cause_id);

                let cause = {};
                cause = current;
              
                //console.log("current", current.cause_thank_you_image_v2);
                let get_cause_images = getSplitedData(current.cause_thank_you_image_v2, cause_thank_you_image_v2);
                let get_cause_partners = getSplitedData(current.partners, partners_array);
                let get_cause_sponsors = getSplitedData(current.sponsors, sponsors_array);
                // console.log("get_cause_images", get_cause_images);
                cause.amount_raised = total_cause_amount[0].amount_raised;
                cause.total_runs = total_cause_amount[0].total_runs;
                cause["cause_thank_you_image_v2"] = get_cause_images;
                cause["partners"] = get_cause_partners;
                cause["sponsors"] = get_cause_sponsors;
                cause.cause_image = getImagePath(cause.cause_image);
                cause.app_update = cause.app_update_id;
                delete cause.app_update_id;
                cause.pk = current.cause_id;
                delete cause.cause_id;
                cause_result.push(cause)

            }
            final_data.count = cause_response.length;
            final_data.results = cause_result;
            final_data["exchange_rates"] = exchange_rate;
            final_data["overall_impact"] = get_data.overall
            final_data["overall_num_steps"] = get_data.step_count;
            final_data["overall_num_runs"] = get_data.run_count;
            res.json(final_data);
        }
        else {
            logger.info("Data not came thought cause API", cause_response, result);
            res.status(403).send("Unable to get data. Please contact admin");
        }

        // res.json(cause_response);

    }

}

module.exports = causeModel;