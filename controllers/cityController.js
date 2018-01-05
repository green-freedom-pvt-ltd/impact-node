

var Sequelize = require("sequelize");
var environment = process.env.ENV;
var config = require('config');
var sequilizeConfig = config.get('Customer.sequilize');
var dbConfig = config.get('Customer.dbConfig');
const logger = require('../logger');

var sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
  host: dbConfig.host,
  dialect: sequilizeConfig.dialect,
  pool: sequilizeConfig.pool,
});
const City = sequelize.import("../models/share_api_city");




var cityModel = {
  //Create New city
  createCity(req, res) {
    console.log("req.body------------", req.body);
    const city = req.body.city;
    console.log("CITY", city);
    return City
      .create({
        city: city
      })
      .then(city => {
        res.status(201).send(city);
      })
      .catch(error => res.status(400).send(error));
  },


  //Update single city
  updateCity(req, res) {
    const newCity = req.body.city;
    console.log("req...........", req.body);
    const oldCityId = req.params.id;
    City.update({ city: newCity }, { where: { id: oldCityId } })
      .then(city => {
        console.log("city------------", city[0]);
        City.findAndCount({
          where: { id: oldCityId }
        }).then(city => {
          // res.json(city);
          res.status(201).send(city);
        });
      })
      .catch(error => res.status(400).send(error));
  },

  //GET all cities
  getCities(req, res) {
    return City.findAndCountAll()
      .then(city => {
        console.log(city.count);
        res.json(city);
      });
  },

  // GET one city by id
  getParticularCity(req, res) {
    const id = req.params.id;
    City.findAndCount({
      where: { id: id }
    })
      .then(city => {
        res.json(city);
      });
  },

  // DELETE single city
  destroyCity(req, res) {
    const id = req.params.id;
    City.destroy({
      where: { id: id }
    })
      .then(city => {
        res.json(city);
      });
  },



};


module.exports = cityModel;