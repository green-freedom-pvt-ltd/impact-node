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


var causeModel = {
    getCauses(req, res) {
        db.causes.all()
            .then((cause) => {
                res.json(cause);
            })
    }

}

module.exports = causeModel;