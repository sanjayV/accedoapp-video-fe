'use strict';

/**
 * @ngdoc function
 * @name accedoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the accedoApp
 */
angular.module('accedoApp')
    .controller('HistoryCtrl', function($scope, $cookies, $filter, $window, $sce, $compile, httpRequest, ACCEDO_CONFIG) {
        var dateKey = "";
        $scope.showHistory = false;
        $scope.userHistory = {};
        $scope.userEmail = $cookies.get('userEmail');
        httpRequest.getFn(ACCEDO_CONFIG.GET_HISTORY + $scope.userEmail, function(res) {
            if (res && res.status !== undefined && res.result && res.result.length) {
                angular.forEach(res.result, function(value, key) {
                    dateKey = $filter('date')(value.view_date, 'dd-MM-yyyy');
                    if (!$scope.userHistory[dateKey]) {
                        $scope.userHistory[dateKey] = [];
                    }

                    $scope.userHistory[dateKey].unshift(value);

                    if (key === res.result.length - 1) {
                        $scope.showHistory = true;
                    }
                })
            } else {
                console.log('WS error for save history for video');
            }
        });

        $scope.trustyUrl = function(url) {
            return $sce.trustAsResourceUrl(url);
        };

        $scope.openVideoPlayer = function(obj) {
            var modalH = parseInt(angular.element($window).height(), 10);
            $scope.modalStyle = { 'height': modalH * 0.8 + 'px', 'width': '100%' };
            $scope.vtitle = obj.title;
            $scope.vdesc = obj.desc;
            $scope.videoConfig = obj.video_object;

            var videoHtml = '<video controls>' +
                '<source ng-src="{{ trustyUrl(videoConfig.url) }}" type="video/{{ videoConfig.format }}" /> Your browser does not support the video tag.' +
                '</video>';
            angular.element('.videoContainer').html($compile(videoHtml)($scope));
            angular.element('#videoModal').modal('show');

            var elem = angular.element('video')[0];
            if (elem.requestFullscreen) {
                elem.requestFullscreen();
            } else if (elem.mozRequestFullScreen) {
                elem.mozRequestFullScreen();
            } else if (elem.webkitRequestFullscreen) {
                elem.webkitRequestFullscreen();
            }
            angular.element('video').trigger('play');

            videoEndEvent();
        };

        function videoEndEvent() {
            angular.element('video').on('ended', function() {
                angular.element('#videoModal').modal('hide');
            });
        }

        angular.element('#videoModal').on('hidden.bs.modal', function() {
            angular.element('.videoContainer').html('');
        })
    });
