var config = require('config');
const logger = require('../../logger');
const db = require('../../db/index');
const pagin = require('../../middleware/pagination');
const env = require('../../config/settings');
const paginconfig = env.pagination;
var Sequelize = require("sequelize");
var sequelize = db.sequelize;


let Badges = {
    getBadges(req, res) {
        db.badges.all()
            .then((badge) => {
                res.send(badge);
            })
    },

    postBadges(req, res) {
        let badges = req.body;

        db.badges.create(badges)
            .then(result => {
                res.send(result);
            })
    }
}

module.exports = Badges;