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
		objectResponse.previous = currPage - 1 <= 0 || currPage >= totalPage ? null : prevUrl.href;

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

	validate(rowValue, value) {
		
		switch (rowValue) {
			case 'boolean':
				// var patt = new RegExp(/^(true|false)$/);
				// console.log("test Result for bool :  ", patt.test(value))

				//return patt.test(value.is_chat);
				return validator.isBoolean(value);

			case 'integer':
				// var patt = new RegExp(/^\d*$/);
				// console.log("test Result for integer :  ", patt.test(value))
				// return patt.test(value);
				return validator.isInt(value);
				break;
			case 'string':
				
				return true;
				break;

			default:
				break;
		}
	},

	// this function takes the url query from the client 
	// and converts it into a sequalize query for fetching
	// the models.
	createQuery(urlQuery, filterList) {
		var whereQuery = {};
		var keys = Object.keys(urlQuery);
		var value = Object.values(urlQuery);
		var validate = false;
		for (var i = 0; i < keys.length; i++) {
			
			var isValidate = false;
			if (filterList) {
				// This getIndex checks the availability of key from query string url and 
				//if true then return object otherwise return -1 if key is not available in filterlist 
				var getIndex = filterList.map(function (item) {
					return item[0];
				}).indexOf(keys[i])
				//console.log('index', filterList[getIndex], getIndex, value[i]);

				isValidate = getIndex === -1?false: this.validate(filterList[getIndex][1], value[i]);
			
			}
			if (isValidate) {
				whereQuery[keys[i]] = urlQuery[keys[i]];
			}
			// this code if for adding more filter options in the query
			// it identifies if there is any identifier and automatically adds
			// it to the sequalize where query object
			var filterParameter = keys[i];
			var filterOptions = filterParameter.split(".");
			if (filterOptions.length > 1) {
				if (filterList.includes(filterOptions[0]) && filterOptionsList.includes(filterOptions[1])) {
					whereQuery[filterOptions[0]] = {
						[Op[filterOptions[1]]]: urlQuery[keys[i]]
					};
				}
			}
		}
		console.log("WHERe", whereQuery);
		return whereQuery;
	},



};




module.exports = pagination;
