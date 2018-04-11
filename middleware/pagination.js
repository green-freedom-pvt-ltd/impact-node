var config = require('config');
const { URL, URLSearchParams } = require('url');
const logger = require('../logger');
var Sequelize = require("sequelize");
const filterOptionsList = ['gt', 'gte', 'lt', 'lte', 'like'];
var validator = require('validator');
var _ = require('underscore');

const Op = Sequelize.Op

var pagination = {
	// This function takes the respons object and
	// attaches to it
	// 1. limit
	// 2. next page
	// 3. previous page



	getPagination(objectResponse, req, limit) {

		var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
		const totalPage = Math.ceil(parseInt(objectResponse.count) / limit);
		objectResponse.results = objectResponse.rows;
		delete objectResponse.rows;
		objectResponse.limit = limit || 5;
		var currPage = 1;
		if (req.query.page) {
			currPage = parseInt(req.query.page);
		}
		var next = new URL(fullUrl);
		var nextUrl = next;
		nextUrl.searchParams.set('page', currPage + 1);
		var prev = new URL(fullUrl);
		var prevUrl = prev;
		prevUrl.searchParams.set('page', currPage - 1);
		objectResponse.next = currPage >= totalPage ? null : nextUrl.href;
		objectResponse.previous = currPage - 1 <= 0 || currPage - 1 >= totalPage ? null : prevUrl.href;

		return objectResponse;
	},

	// This function is used to calculate and offset value 
	// based on the the page numbers and limit of the API
	getOffset(limit, urlQuery) {
		if (limit) {
			var page = 1;
			if (urlQuery && urlQuery.page) {
				page = parseInt(urlQuery.page);
			}
			var offset = page == 1 ? 0 : ((page - 1) * limit);
			return {
				limit: limit,
				offset: offset
			};
		} else {
			return;
		}
	},

	validate(dataType, value) {

		switch (dataType) {
			case 'boolean':
				return validator.isBoolean(value);
			case 'integer':
				return validator.isInt(value);
				break;
			case 'float':
				return validator.isFloat(value);
			case 'string':
				return true;
				break;
			case 'hexa-decimal':
				return validator.isHexadecimal;
				break;
			case 'alfa-numeric':
				return validator.isAlphanumeric;
				break;
			default:
				break;
		}
	},

	// this function takes the url query from the client 
	// and converts it into a sequalize query for fetching
	// the models.
	createQuery(urlQuery, filterList, parameterTypes) {
		var isValidated = false;
		var whereQuery = {};
		var keys = Object.keys(urlQuery);
		for (var i = 0; i < keys.length; i++) {
			// this code if for adding more filter options in the query
			// it identifies if there is any identifier and automatically adds
			// it to the sequalize where query object
			var filterParameter = keys[i];
			var filterOptions = filterParameter.split(".");
			if (filterOptions.length > 1) {
				if (filterList.includes(filterOptions[0]) && filterOptionsList.includes(filterOptions[1])) {
					// This part checks if the value for the filter parameter given in the url 
					// is of the datatype provided in the database 
					isValidated = this.validate(parameterTypes[filterOptions[0]], urlQuery[keys[i]]);
					if (isValidated) {
						whereQuery[filterOptions[0]] = {
							[Op[filterOptions[1]]]: urlQuery[keys[i]]
						};
					} else {
						throw "Value of the atrribute " + filterOptions[0] + " is supposed to be " + parameterTypes[filterOptions[0]];
					}
				} else {
					throw "Filter Parameter " + filterOptions[0] + " along with filter option " + filterOptions[1] + " does not exist";
				}
			} else {
				// This part checks if the given filter parameter exists in filter list of the model
				// If it is not included then it throws an exception
				if (filterList.includes(keys[i])) {
					// This part checks if the value for the filter parameter given in the url 
					// is of the datatype provided in the database 
					isValidated = this.validate(parameterTypes[keys[i]], urlQuery[keys[i]]);
					if (isValidated) {
						whereQuery[keys[i]] = urlQuery[keys[i]];
					} else {
						throw "Value of the atrribute " + keys[i] + " is supposed to be " + parameterTypes[keys[i]];
					}
				} else {
					if (keys[i] == 'page') { 
						if(parseInt(urlQuery.page) && parseInt(urlQuery.page) > 0){
							continue; 
						}
						else{
							throw "please enter valid parameter in url query string"
						}
					}
					throw "Filter Parameter " + keys[i] + " does not exist";
				}
			}
		}
		return whereQuery;
	},

	validateReqBody(body, parameterTypes, fields) {
		var validation = false;
		var keys = Object.keys(body);
		for (let i = 0; i < keys.length; i++) {
			const element = keys[i];
			var filterParameter = keys[i];
			if (fields.includes(keys[i])) {
				// This part checks if the value for the filter parameter given in the url 
				// is of the datatype provided in the database 
				isValidated = this.validate(parameterTypes[keys[i]], body[keys[i]]);
				if (isValidated) {
					// whereQuery[keys[i]] = urlQuery[keys[i]];
					validation = true;
				} else {
					throw "Value of the atrribute " + keys[i] + " is supposed to be " + parameterTypes[keys[i]];
				}
			} else {
				if (keys[i] == 'page') { 
					
					continue;
				 }
				throw "Filter Parameter " + keys[i] + " does not exist";
			}
		}
		return validation;
	},




};




module.exports = pagination;
