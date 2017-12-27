var Sequelize = require("sequelize");


var sequelize = new Sequelize('share_backend_dev_api', 'nishant', 'Impact123', {
    host: 'localhost',
    dialect: 'postgres',
  
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
  
  
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
 
 
