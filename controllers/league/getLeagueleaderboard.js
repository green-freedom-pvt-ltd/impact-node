
const logger = require('../../logger');
const pagin = require('../../middleware/pagination');
const db = require('../../db/index');
const env = require('../../config/settings');
const paginconfig = env.pagination;
var Sequelize = require("sequelize");
var sequelize = db.sequelize;
const settings  = require('../../config/settings')
const filterList = [];
const parameterTypes = {};




var league_team_leaderboard = {

    async getLeagueLeaderboard(req, res) {
        let team_number = req.query.team_id;
        let user = req.user_id;
        // console.log("team_number",team_number);
        let team_members = [];
        let final_data = {};
        logger.warn("need to remove url_for_image on stage");
        var URL_FOR_IMAGE = settings.PROD_DOMAIN + 'media/'            //req.protocol + '://' + req.get('host')+ '/media/';

        let GET_LEAGUE_DETAIL_QUERY = `SELECT * FROM share_api_impactleague where id=(SELECT impactleague_id FROM share_api_team where id =(SELECT team_id  FROM public.share_api_employee
        where user_id=:user_id AND is_logout=false))`;
        let GET_TOTAL_STATS = `SELECT sum(total_team_amount) AS total_amount, sum(team_run_count) AS run_count, sum(total_team_distance) AS total_distance, 
         sum(total_team_member) AS members FROM public.share_api_leagueleaderboard where team_id in (SELECT id from share_api_team where impactleague_id = :league_id)`;

        let GET_TEAM_STATS = `SELECT ll.team_id,t.team_name,t.team_captain,t.team_captain_email_id,t.team_logo,ll.total_team_amount,ll.team_run_count,ll.total_team_distance,ll.total_team_member FROM public.share_api_leagueleaderboard ll
       LEFT JOIN share_api_team t ON t.id = ll.team_id where ll.team_id in (SELECT id from share_api_team where impactleague_id = :league_id) AND t.invisible= false order by ll.total_team_amount DESC`


        
            const get_league_detail = await sequelize.query(GET_LEAGUE_DETAIL_QUERY,
                {
                    replacements: { user_id: user },
                    type: sequelize.QueryTypes.SELECT
                }
            )

            console.log("RESULT",get_league_detail.length);
            if (get_league_detail.length > 0) {
                console.log("league_detail", get_league_detail[0]);
                let league_data = get_league_detail[0];
                
                final_data.impactleague_name = league_data.impactleague_name,
                final_data.impactleague_is_active = league_data.is_active,
                final_data.impactleague_start_date = new Date(league_data.start_date).getTime(),
                final_data.impactleague_end_date = new Date(league_data.end_date).getTime(),
                final_data.duration = league_data.duration,
                final_data.impactleague_bannerr = URL_FOR_IMAGE + league_data.impactleague_banner,
                final_data.show_team_logo = league_data.show_team_logo
                console.log("final_data", final_data);
            }
            else {
                return res.status(406).send({ "error": "No record found while fetching league data" })
            }

        
        try {
            const get_league_stats = await sequelize.query(GET_TOTAL_STATS,
                {
                    replacements: { league_id: get_league_detail[0].id },
                    type: sequelize.QueryTypes.SELECT
                }
            )
            if (get_league_stats.length > 0) {
                let league_stats = get_league_stats[0];
                //console.log("CAME IN True",league_stats);
                final_data.total_distance = league_stats.total_distance,
                    final_data.total_amount = league_stats.total_amount,
                    final_data.total_runs = league_stats.run_count;
                final_data.total_members = league_stats.members
            }
            else {
                return res.status(406).send({ "error": "No record found while fetching league data" })
            }

        } catch (error) {
            logger.error(error)
            return res.status(406).send({ "error": "Something failed! Contact the admin." })
        }

        try {
            const get_team_stats = await sequelize.query(GET_TEAM_STATS,
                {
                    replacements: { league_id: get_league_detail[0].id },
                    type: sequelize.QueryTypes.SELECT
                }
            )
            if (get_team_stats.length > 0) {
                // console.log("get_team_stats",get_team_stats);
                final_data.count = get_team_stats.length;
                final_data.results = get_team_stats;
                res.json(final_data);
            }
            else {
                return res.status(406).send({ "error": "No record found while fetching league data" })
            }
        } catch (error) {
            logger.error(error)
            return res.status(406).send({ "error": "Something failed! Contact the admin." })
        }

    }

}






module.exports = league_team_leaderboard;
