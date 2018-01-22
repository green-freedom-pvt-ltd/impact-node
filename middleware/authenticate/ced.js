const User = require('../../controllers/user/index');
const db = require('../../db/index');

module.exports = function(options) {
  return function(req, res, next) {

    // This is responsible for all authenticatio
    // For now we authenticate all requests with the tokens
    // saved in our database 
    // If the user does note exist we return a 400
    const token = req.headers.authorization;
    if (token) {
      if (token == '4142134awfdsfaef2q3q234dfzSdfAiocvnhvpi113135knuoa'){
    	 next()
      }  else {
        res.status(404).send('Please contact customer care');
      }
    } else {
      res.status(400).send('Please add Authorization Headers');
    }

  }
}