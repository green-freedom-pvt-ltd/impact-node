// import { json } from "../../../../.cache/typescript/2.6/node_modules/@types/express";



var config = require('config');
const logger = require('../../logger');
const db = require('../../db/index');
const baseUrl = 'http://localhost:3000/user';
const pagin = require('../../middleware/pagination');
const env = require('../../config/settings');
const paginconfig = env.pagination;
const filterList = ['user_id', 'first_name', 'last_name','email'];



var userModel = {

  //GET all users
  getUsers(req, res) {

    var urlQuery = req.query;
    var whereQuery = pagin.createQuery(urlQuery, filterList);
    console.log("paginconfig------------------", paginconfig.SMALL);
    return db.users.findAndCountAll({
      where: whereQuery,
      limit: paginconfig.SMALL,
      offset: (urlQuery.page == 0 || (isNaN(urlQuery.page)) ? 1 : urlQuery.page == 1) ? 0 : ((urlQuery.page - 1) * paginconfig.SMALL)
    })
      .then(user => {
       user= parseJSON(user.rows[0].location_array)
       console.log("Run Location",parseJSON(user.rows[0].location_array))
        res.json(pagin.getPagination(user, req, baseUrl, paginconfig.SMALL));
      })

  },


  //GET SINGLE USER
  // getUser(req, res) {

  //   var userId = req.params.id;
  //   return db.users.findAndCountAll({ where: { user_id: userId } })
  //     .then(user => {
  //       // console.log("RESPONSE.........", users.rows.length);
  //       // getPagination function is used to add pagination in API response
  //       var paginationUser = pagin.getPagination(user, req.query, baseUrl, paginconfig.SMALL)
  //       res.json(paginationUser);
  //     });
  // },

}


module.exports = userModel;