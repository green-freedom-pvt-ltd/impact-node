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


var Config = {
    getClientConfig(req, res) {
        db.runConfig.all()
            .then((cause) => {
                res.json(cause);
            })
            .catch((err) => {
                logger.log(err);
                res.status(400).send({ 'error': 'Something failed! Contact the admin.' })

            })
    }

}

module.exports = Config;