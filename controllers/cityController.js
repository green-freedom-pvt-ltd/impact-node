// import { json } from "../../../../.cache/typescript/2.6/node_modules/@types/express";

var Sequelize = require("sequelize");
var environment = process.env.ENV;
var config = require('config');
var sequilizeConfig = config.get('Customer.sequilize');
var dbConfig = config.get('Customer.dbConfig');
var pagination = config.get('Customer.pagination');
const logger = require('../logger');

var sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
  host: dbConfig.host,
  dialect: sequilizeConfig.dialect,
  pool: sequilizeConfig.pool,
});
const City = sequelize.import("../models/share_api_city");
const baseUrl = 'http://localhost:3000/city';

function getPagination(objectResponse, currPage,url,limit) {

  const totalPage = Math.ceil(parseInt(objectResponse.count) / limit);

  console.log("Hello WORLD.........", objectResponse, currPage, totalPage, url,limit);
  objectResponse = JSON.stringify(objectResponse);
  //  console.log(JSON.stringify(cities));
  objectResponse = JSON.parse(objectResponse);

  objectResponse.next = currPage == totalPage ? null : `${url}/?page=${currPage + 1}`;
  objectResponse.prev = currPage - 1 <= 0 ? null : `${url}/?page=${currPage - 1}`;
  return objectResponse;
}

function getOffset(urlQuery, limit) {
  var page = parseInt(urlQuery.page) || 1;
  var offset = page == 1 ? 0 : ((page - 1) * limit);
  return {
    page: page, 
    offset: offset
  }
}

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

    var limit = pagination.NORMAL;
    var getPageOffset = getOffset(req.query, limit);
    var page= getPageOffset.page;
    var offset= getPageOffset.offset;
    console.log("OFFSET..............", page,offset);
    return City.findAndCountAll({ offset: offset, limit: limit })
      .then(city => {
        res.json(getPagination(city, page, baseUrl,limit));
        // var cities = JSON.stringify(city);
        // //  console.log(JSON.stringify(cities));
        // cities = JSON.parse(cities);

        // res.json(getPagination(cities, page, pageCount, baseUrl));

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