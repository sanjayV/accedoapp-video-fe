'use strict';

/**
 * @ngdoc function
 * @name accedoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the accedoApp
 */
angular.module('accedoApp')
    .service('httpRequest', httpRequestFn);

function httpRequestFn($http) {
    this.getFn = function(url, next, error) {
        $http({
            method: 'GET',
            url: url
        }).success(function(data) {
            if (next) {
                next({ 'status': 'success', result: data });
            }
        }).error(function(data, status, headers, config) {
            if (error) {
                error({ 'status': 'error', result: data });
            }
        });
    }

    this.postFn = function(url, postData, next, error) {
        $http({
            method: 'POST',
            url: url,
            headers: {
                'Content-Type': 'application/json'
            },
            data: postData
        }).success(function(data) {
            if (next) {
                next({ 'status': 'success', result: data });
            }
        }).error(function(data, status, headers, config) {
            if (error) {
                error({ 'status': 'error', result: data });
            }
        });
    }
}
