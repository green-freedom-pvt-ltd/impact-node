const routes = require('express').Router();
const feedback = require('../controllers/FeedbackController');


// these are the routes for feebback
routes.get('/',feedback.getFeedback);



module.exports = routes;