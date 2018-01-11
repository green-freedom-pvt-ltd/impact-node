const User = require('../controllers/user/index');
const db = require('../db/index');

module.exports = function(options) {
  return function(req, res, next) {
    // This is responsible for all authenticatio
    // For now we authenticate all requests with the tokens
    // saved in our database 
    // If the user does note exist we return a 400


    // User.authenticate(req, res);
    console.log("This request is being autheticated")
    const token = req.headers.authorization;
    console.log("inside user auth get user..............",token);      
    if (token) {
    var parts = token.split(' ')
    db.usersToken.findAndCountAll({
      where: { token: parts[1] }
    })
      .then(userstoken => {
    	next()
        // db.users.findAndCountAll({ where: { user_id: userstoken.rows[0].id } })
        //   .then(users => {
        //     res.json(users);
        //   });
      });
    } else {
      res.status(400).send('Please add Authorization Headers');
    }

  }
}