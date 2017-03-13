'use strict';

/**
 * @ngdoc function
 * @name accedoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the accedoApp
 */
angular.module('accedoApp')
    .directive('videoPlayer', videoPlayerDir);

function videoPlayerDir() {
    return {
        templateUrl: 'views/videoPlayer.html',
        link: initializePlayer,
        scope: {
            config: '=config'
        },
        controller: videoPlayerCtrl
    };

    function initializePlayer(scope, tElement, tAttrs) {
        console.log(scope.config)
        if (!scope.config || !scope.config || !scope.config.title || !scope.config.desc || !scope.config.video_object) {
            alert('Invalid data provided to video player');
            return false;
        }

        scope.$watch('config.title', function(newValue, oldValue) {
            if (oldValue === undefined && newValue !== oldValue) {
                $scope.loadVideo(scope.config);
            }
        });
    }

    function videoPlayerCtrl($scope, $sce, $compile, $window, httpRequest, ACCEDO_CONFIG, $cookies) {
        $scope.loadVideo = function(obj) {
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

            $scope.videoEndEvent();
        };

        $scope.trustyUrl = function(url) {
            return $sce.trustAsResourceUrl(url);
        };

        $scope.videoEndEvent = function() {
            angular.element('video').on('ended', function() {
                angular.element('#videoModal').modal('hide');
            });
        };
    }
}