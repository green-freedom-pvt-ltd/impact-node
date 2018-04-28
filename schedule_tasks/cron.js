var config = require('config');
const logger = require('../logger');
const db = require('../db/index');
const env = require('../config/settings');
const paginconfig = env.pagination;
const Sequelize = require("sequelize");
const sequelize = db.sequelize;
const Op = Sequelize.Op
var CronJob = require('cron').CronJob;
let _ = require('underscore');


let INSERTION_TEAMLEDERBOARD = `insert into public.share_api_teamleaderboard(team_id,user_id,total_amount,total_distance,run_count)
select team_id_id,user_id_id,sum(run_amount),sum(distance),count(run_id) from share_api_runs
where team_id_id IS Not NULL AND is_flag= false
group by team_id_id,user_id_id
order by sum(run_amount) desc;`

// let cron = schedule.scheduleJob('*/5 * * * *', function () {
//     db.users.all({
//         where:{
//             user_id:1213
//         }
//     }).then((result)=>{
//         console.log("Result",result[0].get());
//     })
// });
// cron.nextInvocation(new Date('2018','04','28','13','17'));
// cron.on()
// console.log(cron.nextInvocation(new Date('2018','04','28','13','15')));
let cron = new CronJob('38 3 * * *', function () {
    return sequelize.transaction(function (t) {

        // chain all your queries here. make sure you return them.

        return sequelize.query('delete from share_api_teamleaderboard where user_id =1213 AND team_id = 990;',
            {
                type: sequelize.QueryTypes.SELECT
            },
            { transaction: t }

        )
            .then((result) => {
                console
                if (result) {
                    return sequelize.query(INSERTION_TEAMLEDERBOAR,
                        {
                            type: sequelize.QueryTypes.SELECT
                        },
                        { transaction: t }

                    )
                        .then((leaderboardupdate) => {

                            console.log("leaderboardupdate", leaderboardupdate);
                        })

                }


            })
            .catch((error) => {
                console.log("ERROR OCCURED")
                //console.log(error);
            })
        // return db.sequelize({
        //     firstName: 'Abraham',
        //     lastName: 'Lincoln'
        // }, { transaction: t }).then(function (user) {
        //     return user.setShooter({
        //         firstName: 'John',
        //         lastName: 'Boothe'
        //     }, { transaction: t });
        // });

    }).then(function (result) {
        // Transaction has been committed
        // result is whatever the result of the promise chain returned to the transaction callback
    }).catch(function (err) {
        // Transaction has been rolled back
        // err is whatever rejected the promise chain returned to the transaction callback
    });

}, null, false, 'Asia/Kolkata');

let cron1 = new CronJob(' * * * * *', function () {
    console.log('You will see this message every second');
}, null, false, 'Asia/Kolkata');





console.log('job1 status', cron.running); // job1 status true
console.log('job2 status', cron1.running);
module.exports = {
    cron, cron1
};