
// var config = require('config');
// var pagination = config.get('Customer.pagination');
const logger = require('../logger');
const pagin = require('../middleware/pagination');
const db = require('../db/index');
const env = require('../config/settings');
const paginconfig = env.pagination;

const baseUrl = 'http://localhost:3000/employeelist';

var Employee = {
    getEmployeeList(req, res) {
        var employee = req.params.id;
        employee = parseInt(employee);
    
        if (employee) {
            return db.employee.findAndCountAll({
                where: {
                    id: employee
                }
            })
                .then(employee => {
                   
                    res.json(pagin.getPagination(employee, req.query, baseUrl, paginconfig.NORMAL));
                })
        }
        //get all runs
        else {
            return db.employee.findAndCountAll(pagin.getOffset(paginconfig.SMALL, req.query))
                .then(employee => {
                    // console.log("limit", pagination.NORMAL);
                    res.json(pagin.getPagination(employee, req.query, baseUrl, paginconfig.SMALL));
                })
        }

    }
}

module.exports = Employee;