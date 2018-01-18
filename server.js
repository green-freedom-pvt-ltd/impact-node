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
<<<<<<< HEAD
// app.use('/', authmw());
=======
app.use('/', authmw());
>>>>>>> 365030f7e6fbba6169dac4aab42e6c18330be350
app.use('/', routes);

// this is a test API
app.get('/causespromise', (req, res, next) => res.send(db.getImportantData()));


const port = process.env.PORT || 3000;
app.listen(port, () => console.log('listening on port ' + port));


module.exports = app