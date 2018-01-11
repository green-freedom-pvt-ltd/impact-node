require('newrelic');
const express = require('express');
// const db = require('./db/index');
const authmw = require('./middleware/authenticate');
const logger = require('./logger');
var bodyParser = require('body-parser');
const routes = require('./routes');

// db.connect();


const app = express();


// 
app.use(bodyParser.urlencoded({
  extended: true
}));

// this middleware is for checking authentication for all requests
app.use('/', authmw());
app.use('/', routes);


app.get('/causespromise', (req, res, next) => res.send(db.getImportantData()));


const port = process.env.PORT || 3000;
app.listen(port, () => console.log('listening on port ' + port));