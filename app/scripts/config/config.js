'use strict';

/**
 * @ngdoc overview
 * @name cuddleApp
 * @description
 * # cuddleApp
 *
 * Main module of the application.
 */
angular.module('accedoApp')
	.constant('ACCEDO_CONFIG', {
			'SERVICE_URL': 'https://demo2697834.mockable.io/movies',
			'IP_URL': 'http://ipv4.myexternalip.com/json',
			'DEFAULT_IP': '127.0.0.1',
			'ADD_HISTORY': 'https://accedo-video-app-api.herokuapp.com/addHistory',
			'GET_HISTORY': 'https://accedo-video-app-api.herokuapp.com/getHistory/',
			'ADD_WATCH_LATER': 'https://accedo-video-app-api.herokuapp.com/addlaterVideo',
			'GET_WATCH_LATER': 'https://accedo-video-app-api.herokuapp.com/laterVideo/'
		}
	);