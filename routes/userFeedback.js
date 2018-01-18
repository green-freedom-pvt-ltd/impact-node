const routes = require('express').Router();
const logger = require('../logger');
const causedb = require('../db/cause');
const feedback = require('../controllers/FeedbackController');


// these are the routes for feebback
routes.get('/',feedback.getFeedback);
// routes.get('/:user_id', feedback.getFeedback);



module.exports = routes;