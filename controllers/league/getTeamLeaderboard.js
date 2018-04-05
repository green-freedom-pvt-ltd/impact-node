
const logger = require('../../logger');
const pagin = require('../../middleware/pagination');
const db = require('../../db/index');
const env = require('../../config/settings');
const paginconfig = env.pagination;

const filterList = [];
const parameterTypes = {};




var league_leaderboard = {

    async getTeamLeaderboard(req, res) {
        let team_number = req.query.team_id;
        let user = req.user_id;
       

        if (typeof team_number === 'undefined') {
            try {
                const team = await db.employee.all({
                    attributes: ['team_id'],
                    where: {
                        user_id: user,
                        is_logout:false
                    }
                })
                let members = await JSON.parse(JSON.stringify(team));
              
                if(members.length>0){
                   
                    team_number = members[0].team_id
                }
                else{
                    return res.status(403).send({ "error": "user is not belongs to any team" });
                }
              
            } catch (error) {
                logger.error(error);
                res.status(406).send({ "error": "Something failed! Contact the admin." });
            }
            
        }


        let team_members = [];
        let final_data = {};
        try {
            const team = await db.teamleaderboard.findAndCountAll({
                attributes:
                    ['user_id', 'total_amount', 'total_distance', 'run_count'],
                include: [
                    {
                        model: db.users,
                        attributes:
                            ['first_name', 'last_name', 'gender_user',
                                'phone_number', 'social_thumb', 'birthday']

                    }
                ],
                where: { team_id: team_number }
            })
            let members = await JSON.parse(JSON.stringify(team));
            if (members.rows[0]) {

                let new_value = members.rows.map((current, index) => {

                    let team_response = {};
                    team_response.user_id = current.user_id;
                    team_response.ranking = index + 1;
                    team_response.amount = current.total_amount;
                    team_response.distance = current.total_distance;
                    team_response.first_name = current.share_api_user.first_name;
                    team_response.last_name = current.share_api_user.last_name;
                    team_response.gender_user = current.share_api_user.gender_user;
                    team_response.phone_number = current.share_api_user.phone_number;
                    team_response.social_thumb = current.share_api_user.social_thumb;
                    team_response.birthday = current.share_api_user.birthday;
                    team_members.push(team_response);
                })
                final_data.count = members.count;
                final_data.results = team_members;
                res.json(final_data);
            } else {
                return res.status(406).send({ "error": "No record found while fetching league data" });
            }

        } catch (error) {
            logger.error(error);
            return res.status(406).send({ "error": "Something failed! Contact the admin." })
        }

    }

}




module.exports = league_leaderboard;
