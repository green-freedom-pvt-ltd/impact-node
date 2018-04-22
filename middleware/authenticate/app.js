const User = require('../../controllers/user/index');
const db = require('../../db/index');

module.exports = function (options) {
  return function (req, res, next) {

    // This is responsible for all authenticatio
    // For now we authenticate all requests with the tokens
    // saved in our database 
    // If the user does note exist we return a 400
    const token = req.headers.authorization;
    if (token) {
      var parts = token.split(' ')
      db.usersToken.findAndCountAll({
        where: { token: parts[1] }
      })  
        .then(userstoken => {
         
          if (userstoken.rows.length == 1 ) {
            req.user_id=userstoken.rows[0].user_id;
            // console.log('userstoken----',req.user_id);
            next()
          } else {
            res.status(404).send({error :'Invalid access token!'});
          }
        });
    } else {
      res.status(400).send('Please add Authorization Headers');
    }

  }
}