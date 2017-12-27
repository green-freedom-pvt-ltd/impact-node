var Sequelize = require("sequelize");
var environment = process.env.ENV;
var config = require('config');

var sequilizeConfig = config.get('Customer.sequilize');

var sequelize = new Sequelize(sequilizeConfig.database_name, sequilizeConfig.user, sequilizeConfig.password, {
    host:sequilizeConfig.host,
    dialect:sequilizeConfig.dialect,
    pool: sequilizeConfig.pool,
  });


  const City = sequelize.import("./models/share_api_city")
  City.findAll();
  // var User = sequelize.define('user', {
  //   firstName: {
  //     type: Sequelize.STRING,
  //     field: 'first_name' // Will result in an attribute that is firstName when user facing but first_name in the database
  //   },
  //   lastName: {
  //     type: Sequelize.STRING
  //   },
  //   age: {
  //       type: Sequelize.INTEGER
  //     }
  // }, {
  //   freezeTableName: true // Model tableName will be the same as the model name
  // });
  




  // User.sync({force: true}).then(function () {
  //   // Table created
  //   return User.create({
  //     firstName: 'Nishant',
  //     lastName: 'Khandelwal',
  //     age:26
  //   });
  // });
  
  //Insert item into User model/table
  // City.create({  
  //   city:'Baran'
  //   })
  // .then(city => {
  //   console.log(`New ${city.city}, with id ${city.id} has been created.`);
  // });
 
 
