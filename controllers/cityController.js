

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
const City = sequelize.import("../models/share_api_city")



// var getCities =(cb) => City.findAll({ offset: 5, limit: 10 }).then((city)=>{

//     let name = JSON.stringify(city,null,2);
//     return cb(name);
//   });

// var insertCity =(cb) => City.create({
//     city: 'Khandala'
//   });

module.exports = {
//Create New city
  createCity(req, res) {
    const city = req.query.city;
    console.log("CITY",city);
    return City
      .create({
        city: city
      })
      .then(city => {
           res.status(201).send(city);
      })
      .catch(error => res.status(400).send(error));
  },
  // list(req, res) {
  //   return City.findAll({ offset: 5, limit: 10 })
  //     .then(cities => res.status(200).send(cities))
  //     .catch(error => res.status(400).send(error));
  // },

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
  }

};


// module.exports ={
//     getCities,
//     // insertCity,
//     createCity
// };