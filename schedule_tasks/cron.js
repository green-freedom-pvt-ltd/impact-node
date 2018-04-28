var schedule = require('node-schedule');
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
let cron = new CronJob('* * * * *', function () {
    db.users.all({
        where: {
            user_id: 1213
        }
    }).then((result) => {
        console.log("Result", result[0].get());

    })

}, null, false, 'Asia/Kolkata');

let cron1 = new CronJob(' * * * * *', function () {
    console.log('You will see this message every second');
}, null, false, 'Asia/Kolkata');





console.log('job1 status', cron.running); // job1 status true
console.log('job2 status', cron1.running);
module.exports = {
    cron, cron1
};