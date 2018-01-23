var config = require('config');
const { URL, URLSearchParams } = require('url');
const logger = require('../logger');
var Sequelize = require("sequelize");
const filterOptionsList = ['gt','gte', 'lt', 'lte' , 'like'];

const Op = Sequelize.Op

var pagination = {
	// This function takes the respons object and
	// attaches to it
	// 1. limit
	// 2. next page
	// 3. previous page
	getPagination(objectResponse, req, url, limit) {
		var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
		const totalPage = Math.ceil(parseInt(objectResponse.count) / limit);
		objectResponse.limit = limit || 5;
		var currPage = 1;
		if (req.query.page) {
			currPage = parseInt(req.query.page);
		}
		var next = new URL(fullUrl);
		var nextUrl = next;
		nextUrl.searchParams.set('page', currPage + 1);
		var previous = new URL(fullUrl);
		var previousUrl = previous;
		previousUrl.searchParams.set('page', currPage - 1);
		objectResponse.next = currPage == totalPage ? null : nextUrl.href;
		objectResponse.previous = currPage - 1 <= 0 ? null : previousUrl.href;
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

	// this function takes the url query from the client 
	// and converts it into a sequalize query for fetching
	// the models.
	createQuery(urlQuery, filterList) {
	    var whereQuery = {};
	    var keys = Object.keys(urlQuery);
	    for (var i = 0; i < keys.length; i++) {
	      if (filterList.includes(keys[i])) {
	        whereQuery[keys[i]]= urlQuery[keys[i]];
	      }
	      // this code if for adding more filter options in the query
	      // it identifies if there is any identifier and automatically adds
	      // it to the sequalize where query object
	      var filterParameter =keys[i];
	      var filterOptions = filterParameter.split(".");
	      if (filterOptions.length > 1){
	      	if (filterList.includes(filterOptions[0]) && filterOptionsList.includes(filterOptions[1])) {
	        		whereQuery[filterOptions[0]]= {
	        			[Op[filterOptions[1]]]: urlQuery[keys[i]]
	        		};
	      	}
	      }
	    }
	    return whereQuery;
	},



};




module.exports = pagination;
