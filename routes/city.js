const routes = require('express').Router();
const City = require('../controllers/cityController');


// these are the routes for city
routes.get('/', City.getCities);
routes.post('/',City.createCity);
routes.get('/:id',City.getParticularCity);
routes.delete('/:id',City.destroyCity);
routes.put('/:id',City.updateCity);



module.exports = routes;