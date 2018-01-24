
// var config = require('config');
// var pagination = config.get('Customer.pagination');
const logger = require('../logger');
const pagin = require('../middleware/pagination');
const db = require('../db/index');
const env = require('../config/settings');
const paginconfig = env.pagination;

const baseUrl = 'http://localhost:3000/employeelist';
const filterList = ['id'];


var Employee = {
    getEmployeeList(req, res) {
        var employee = req.params.id;
        employee = parseInt(employee);
    

        var urlQuery = req.query;
        var whereQuery = pagin.createQuery(urlQuery, filterList);
        console.log("paginconfig------------------", paginconfig.SMALL);
        return db.employee.findAndCountAll({
          where: whereQuery,
          limit: paginconfig.SMALL,
          offset: (urlQuery.page == 0 || (isNaN(urlQuery.page)) ? 1 : urlQuery.page == 1) ? 0 : ((urlQuery.page - 1) * paginconfig.SMALL)
        })
          .then(employee => {
         
            res.json(pagin.getPagination(employee, req, baseUrl, paginconfig.SMALL));
          })





        // if (employee) {
        //     return db.employee.findAndCountAll({
        //         where: {
        //             id: employee
        //         }
        //     })
        //         .then(employee => {
                   
        //             res.json(pagin.getPagination(employee, req.query, baseUrl, paginconfig.NORMAL));
        //         })
        // }
        // //get all runs
        // else {
        //     return db.employee.findAndCountAll(pagin.getOffset(paginconfig.SMALL, req.query))
        //         .then(employee => {
        //             // console.log("limit", pagination.NORMAL);
        //             res.json(pagin.getPagination(employee, req.query, baseUrl, paginconfig.SMALL));
        //         })
        // }

    }
}

module.exports = Employee;