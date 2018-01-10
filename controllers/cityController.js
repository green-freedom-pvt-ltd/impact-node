// import { json } from "../../../../.cache/typescript/2.6/node_modules/@types/express";

var config = require('config');
var pagination = config.get('Customer.pagination');
const logger = require('../logger');
const pagin = require('../middleware/pagination');


const db = require('../db/index');

const baseUrl = 'http://localhost:3000/city';


var cityModel = {
  //Create New city
  createCity(req, res) {
    console.log("req.body------------", req.body);
    const city = req.body.city;
    console.log("CITY", city);
    return db.city
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
    db.city.update({ city: newCity }, { where: { id: oldCityId } })
      .then(city => {
        console.log("city------------", city[0]);
        db.city.findAndCount({
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
    return db.city.findAndCountAll(pagin.getOffset(pagination.SMALL,req.query))
      .then(city => {
        res.json(pagin.getPagination(city, req.query, baseUrl));
      });
  },



  // GET one city by id
  getParticularCity(req, res) {
    const id = req.params.id;
    db.city.findAndCount({
      where: { id: id }
    })
      .then(city => {
        res.json(city);
      });
  },

  // DELETE single city
  destroyCity(req, res) {
    const id = req.params.id;
    db.city.destroy({
      where: { id: id }
    })
      .then(city => {
        res.json(city);
      });
  },



};


module.exports = cityModel;