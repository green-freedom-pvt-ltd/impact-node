var config = require('config');
const logger = require('../../logger');
const db = require('../../db/index');



const filterList = [];
const parameterTypes = {};


var fraudster = {
    postFraudster(req, res) {
        let data = req.body;
        let Fraudster = {};
        let user = req.user_id;
        Fraudster.user_id_id = data.user_id;
        Fraudster.client_run_id = data.client_run_id;
        Fraudster.cause_id_id = data.cause_id;
        Fraudster.usain_bolt_count = data.usain_bolt_count;
        Fraudster.mock_location_used = data.mock_location_used;
        Fraudster.timestamp = data.timestamp;
        Fraudster.team_id_id = data.team_id;

        return db.fraudster.create(Fraudster)
            .then(result => {
                res.status(200).send(result);
            })
            .catch(err => {
                logger.error(err);
                res.status(400).send(err)
                throw new Error(err);
            })

    }

}

module.exports = fraudster;