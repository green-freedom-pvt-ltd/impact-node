const routes = require('express').Router();
const logger = require('../logger');
const causedb = require('../db/cause');
const User = require('../controllers/user/index');


// these are the routes for city
routes.get('/', User.getUsers);
// routes.get('/:id', User.getUser);



module.exports = routes;