// import { json } from "../../../../.cache/typescript/2.6/node_modules/@types/express";



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
const baseUrl = 'http://localhost:3000/city';



var cityModel = {
  //Create New city
  createCity(req, res) {
    const city = req.body.city;
    console.log("req.body------------", req.body);
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
    // console.log("req...........", req.params);
    const newCity = req.body.city;
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
    var page = parseInt(req.query.page) || 1;
    var limit = 10;
    
    var offset = page ==1?0:((page-1) * limit);
    console.log("OFFSET..............",offset);
    return City.findAndCountAll({offset:offset,limit:limit})
    .then(city => {
      const pageCount = Math.ceil(parseInt(city.count)/limit);
    console.log("pageCount..............",pageCount);      
      var cities = JSON.stringify(city);
     //  console.log(JSON.stringify(cities));
      cities = JSON.parse(cities);
      cities.next =page == pageCount?null:`${baseUrl}/?page=${page+1}`;
      cities.prev = page-1<=0?null:`${baseUrl}/?page=${page-1}`;
      res.json(cities);
         
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