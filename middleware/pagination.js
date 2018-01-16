'use strict'

var config = require('config');

var pagination = {
// getPagination function is used to add pagination in API response. It takes response object,
//current page from query url, base url and limit
	getPagination(objectResponse, urlQuery,url,limit) {
	  var currPage = parseInt(urlQuery.page) || 1;

	  const totalPage = Math.ceil(parseInt(objectResponse.count) / limit);

	  // console.log("Hello WORLD.........", objectResponse, currPage, totalPage, url,limit);
	  objectResponse = JSON.stringify(objectResponse);
	  //  console.log(JSON.stringify(cities));
	  objectResponse = JSON.parse(objectResponse);
	  objectResponse.limit = limit || 5 ;
	  objectResponse.next = currPage == totalPage ? null : `${url}/?page=${currPage + 1}`;
	  objectResponse.prev = currPage - 1 <= 0 ? null : `${url}/?page=${currPage - 1}`;
	  return objectResponse;
	},

	//get Offset function used to get page and offset value from url
	getOffset(limit, urlQuery) {
		if (limit) {
			// var limit = pagination.SMALL;
			var page = 1;
			if (urlQuery && urlQuery.page) {
				console.log('limit123------------', limit, urlQuery, page);
				page = parseInt(urlQuery.page);
			}
			var offset = page == 1 ? 0 : ((page - 1) * limit);
			console.log('limit------------', limit,offset, urlQuery, page);
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
