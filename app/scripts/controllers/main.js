'use strict';

/**
 * @ngdoc function
 * @name accedoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the accedoApp
 */
angular.module('accedoApp')
    .controller('MainCtrl', function($scope, httpRequest, ACCEDO_CONFIG, $cookies) {
    	$scope.email = "";
    	if (!$cookies.get('userEmail')) {
    		angular.element('#userEmailPopup').modal('show');
    	}

    	$scope.getEmail = function() {
    		$cookies.put('userEmail', $scope.email);
    		angular.element('#userEmailPopup').modal('hide');
    	};
    });