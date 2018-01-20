var config = require('config');
const { URL, URLSearchParams } = require('url');
const logger = require('../logger');


function createQuery(urlQuery) {
	var whereQuery = {};
	var keys = Object.keys(urlQuery);
	for (var i = 0; i < keys.length; i++) {
		logger.info('inside loop', keys[i], urlQuery[keys[i]]);

		whereQuery[keys[i]] = urlQuery[keys[i]];

	}
	return whereQuery;
}
var pagination = {
	// getPagination function is used to add pagination in API response. It takes response object,
	//current page from query url, base url and limit
	getPagination(objectResponse, req, url, limit) {
		var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
		

		var getQuery = createQuery(req.query);
		
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
			var next = new URL(fullUrl);
			next.searchParams.append('page', currPage + 1);
			var prev = new URL(fullUrl);
			prev.searchParams.append('page', currPage - 1);

			
			objectResponse.next = currPage == totalPage ? null : next.href;
			objectResponse.prev = currPage - 1 <= 0 ? null : prev.href;

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
	}


};




module.exports = pagination;
