var config = require('config');
const logger = require('../../logger');


const filterList = [];
const parameterTypes = {};

var server_time = {
    getServerTime(req, res) {

        Date.prototype.addHours = function (h, m) {
            this.setHours(this.getHours() + h);
            this.setMinutes(this.getMinutes() + m)
            return this;
        }
        var dt = new Date().addHours(5, 30);;
        let servertime = [{ "time_standard": dt, "time_epoch": dt.getTime() }]
        res.status(200).send(servertime);


    }
}

module.exports = server_time;