require('newrelic');
var cluster = require('cluster');
const express = require('express');
// const db = require('./db/index');
const appAuth = require('./middleware/authenticate/app');
const cedAuth = require('./middleware/authenticate/ced');
const logger = require('./logger');
var bodyParser = require('body-parser');
const routes = require('./routes');

// db.connect();


const app = express();


// 
// app.use(bodyParser.urlencoded({
//   extended: true
// }));
app.use(bodyParser.json());

// this middleware is for checking authentication for all requests
app.use('/ced/v0', cedAuth());
app.use('/v0/app', appAuth());
app.use('/', routes);

// this is a test API
// app.get('/causespromise', (req, res, next) => res.send(db.getImportantData()));



// clustering for server is done here
// we count the number of cpu cores and
// run node process on each cpu
var numCPUs = require('os').cpus().length;
if (cluster.isMaster) {
    // Fork workers.
    // console.log('numCPUs--------',numCPUs);
    for (var i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    cluster.on('exit', function (worker, code, signal) {
        // handle server crashes
        console.log('worker ' + worker.process.pid + ' died');
    });
} else {
    console.log(cluster.worker.id);
    const port = process.env.PORT || 8000;
    app.listen(8000);
}


module.exports = app
