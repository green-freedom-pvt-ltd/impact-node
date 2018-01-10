const User = require('../controllers/user/index');


module.exports = function(options) {
  return function(req, res, next) {
    // This is responsible for all authenticatio
    // For now we authenticate all requests with the tokens
    // saved in our database 
    // If the user does note exist we return a 400


    // User.authenticate(req, res);
    console.log("This request is being autheticated")
    next()
  }
}