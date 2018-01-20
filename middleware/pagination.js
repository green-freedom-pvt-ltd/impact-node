var config = require('config');
const { URL, URLSearchParams } = require('url');
const logger = require('../logger');
var Sequelize = require("sequelize");

const Op = Sequelize.Op

// function createQuery(urlQuery) {
// 	var whereQuery = {};
// 	console.log('urlQuery----------',urlQuery)
// 	var keys = Object.keys(urlQuery);
// 	for (var i = 0; i < keys.length; i++) {
// 		logger.info('inside loop', keys[i], urlQuery[keys[i]]);
// 		whereQuery[keys[i]] = urlQuery[keys[i]];

// 	}
// 	return whereQuery;
// }
var pagination = {
	// getPagination function is used to add pagination in API response. It takes response object,
	//current page from query url, base url and limit
	getPagination(objectResponse, req, url, limit) {
		var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
		

		// var getQuery = pagination.createQuery(req.query);
		
		const totalPage = Math.ceil(parseInt(objectResponse.count) / limit);

		objectResponse = JSON.stringify(objectResponse);
		objectResponse = JSON.parse(objectResponse);
		objectResponse.limit = limit || 5;
		if (req.query.page) {
			var currPage = parseInt(req.query.page);

			var next = new URL(fullUrl);
			var nextUrl = next;
			nextUrl.searchParams.set('page', currPage + 1);

			var prev = new URL(fullUrl);
			var prevUrl = prev;
			prevUrl.searchParams.set('page', currPage - 1);

			objectResponse.next = currPage == totalPage ? null : nextUrl.href;
			objectResponse.prev = currPage - 1 <= 0 ? null : prevUrl.href;

		}
		else {
			var currPage = 1;
			objectResponse.next = currPage == totalPage ? null : `${fullUrl}?page=${currPage + 1}`;
			objectResponse.prev = currPage - 1 <= 0 ? null : `${fullUrl}?page=${currPage - 1}`;

		}


		// console.log("Hello WORLD.........", objectResponse, currPage, totalPage, url,limit);


		return objectResponse;
	},

	//get Offset function used to get page and offset value from url
	getOffset(limit, urlQuery) {
		if (limit) {
			// var limit = pagination.SMALL;
			var page = 1;
			if (urlQuery && urlQuery.page) {
				// console.log('limit123------------', limit, urlQuery, page);
				page = parseInt(urlQuery.page);
			}
			var offset = page == 1 ? 0 : ((page - 1) * limit);
			// console.log('limit------------', limit,offset, urlQuery, page);
			return {
				limit: limit,
				offset: offset
			};
		} else {
			return;
		}
	}, 

	// logger.info('inside loop', keys[i], urlQuery[keys[i]], filterList.includes(keys[i]));
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
	      // var filterParameter =keys[i];
	      // var filterOptions = filterParameter.split(".");
	      // if (filterOptions.length > 1){
	      // 	if (filterList.includes(filterOptions[0])) {
	      //   	whereQuery[filterOptions[0]]= urlQuery[keys[i]];
	      //   	// whereQuery[filterOptions[0]][Op[filterOptions[1]]]= urlQuery[keys[i]];

	      // 		console.log('filterOptions-----------',whereQuery);
	      // 	}
	      // }
	    }
	    return whereQuery;
	},



};




module.exports = pagination;
