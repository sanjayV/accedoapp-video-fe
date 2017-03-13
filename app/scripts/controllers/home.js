'use strict';

/**
 * @ngdoc function
 * @name accedoApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the accedoApp
 */
angular.module('accedoApp')
  .controller('HomeCtrl', function ($scope, ACCEDO_CONFIG, httpRequest) {
  	var _this = this;
  	this.loadCarousel = false;
  	this.config = {};
  	var carouselObj = [];
  	var tempObj = {};

    if (ACCEDO_CONFIG.SERVICE_URL && ACCEDO_CONFIG.SERVICE_URL !== "") {
    	httpRequest.getFn(ACCEDO_CONFIG.SERVICE_URL, function(res) {
    		if (res && res.result && res.result.entries && res.result.entries.length && res.result.totalCount) {
    			_this.config.totalContent = res.result.totalCount;
    			angular.forEach(res.result.entries, function(value, key) {
    				tempObj = {};
    				if (value.images && value.images.length && value.images[0].url) {
    					tempObj.imgUrl = value.images[0].url;
    				}

    				if (value.title) {
    					tempObj.title = value.title;
    				}

                    if (value.description) {
                        tempObj.description = value.description;
                    }

    				if (value.contents && value.contents.length && value.contents[0].url) {
    					tempObj.videoObj = value.contents[0];
    				}

    				carouselObj.push(tempObj);
    			});

    			if (carouselObj.length) {
    				_this.config.data = carouselObj;
	    			_this.loadCarousel = true;
    			}
    		} else {
    			alert('Invalid object');
    		}
    	}, function(err) {
    		alert(JSON.stringify(err)); //error coming in web-service
    	});
    }
  });
