const User = require('../controllers/user/index');
const db = require('../db/index');

module.exports = function(options) {
  return function(req, res, next) {

    // This is responsible for all authenticatio
    // For now we authenticate all requests with the tokens
    // saved in our database 
    // If the user does note exist we return a 400

    console.log("This request is being autheticated")
    const token = req.headers.authorization;
    console.log("inside user auth get user..............",token);      
    if (token) {
    var parts = token.split(' ')
    db.usersToken.findAndCountAll({
      where: { token: parts[1] }
    })
      .then(userstoken => {
      console.log("inside user auth get user..............",userstoken.rows.length);      
      if (userstoken.rows.length == 1){
    	 next()
      }  else {
        res.status(404).send('Please contact customer care');
      }
      });
    } else {
      res.status(400).send('Please add Authorization Headers');
    }

  }
}