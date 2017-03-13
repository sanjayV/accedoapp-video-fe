'use strict';

/**
 * @ngdoc overview
 * @name accedoAppRoute
 * @description
 * # Routes
 *
 * Routes for app.
 */
angular.module('accedoApp')
    .config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/home.html',
                controller: 'HomeCtrl',
                controllerAs: 'home'
            })
            .when('/history', {
                templateUrl: 'views/history.html',
                controller: 'HistoryCtrl',
                controllerAs: 'history'
            })
            .otherwise({
                redirectTo: '/'
            });
    })
