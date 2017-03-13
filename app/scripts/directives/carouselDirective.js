'use strict';

/**
 * @ngdoc function
 * @name accedoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the accedoApp
 */
angular.module('accedoApp')
    .directive('imageCarousel', imageCarouselDir);

function imageCarouselDir() {
    return {
        templateUrl: 'views/imageCarousel.html',
        link: initializeCarousel,
        scope: {
            config: '=config'
        },
        controller: imageCarouselCtrl
    };

    function initializeCarousel(scope, tElement, tAttrs) {
        if (!scope.config || !scope.config.data || !scope.config.data.length) {
            alert('Invalid data provided to carousel');
            return false;
        }

        scope.data = scope.config.data;
        scope.baseClass = ".infinite-carousel";
        scope.slideSpeed = (scope.config.slideSpeed) ? scope.config.slideSpeed : 500;
        scope.slideCount = (scope.config.slideCount) ? scope.config.slideCount : 1;
        scope.contentWidth = (scope.config.contentWidth) ? scope.config.contentWidth : '';
        scope.totalContent = (scope.config.totalContent) ? scope.config.totalContent : '';
        scope.slidePosTemp = (scope.config.slidePosTemp) ? scope.config.slidePosTemp : 0;
        scope.carouselUlWidth = (scope.config.carouselUlWidth) ? scope.config.carouselUlWidth : 0;
        scope.flag = (scope.config.flag) ? scope.config.flag : true;
        scope.moveImage = (scope.config.moveImage) ? scope.config.moveImage : 1;

        scope.setCarouselWidth();
        scope.getSlideCount();
        scope.setDefaultPosition();
        scope.addEvent();
        scope.resizeEvent();

        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
            scope.mobileSlide();
    }

    function imageCarouselCtrl($scope, $sce, $compile, $window, httpRequest, ACCEDO_CONFIG, $cookies) {
        var modalH = parseInt(angular.element('body').height(), 10) - 15;
        var modalW = parseInt(angular.element('body').width(), 10) - 15;

        $scope.setCarouselWidth = function() {
            $scope.contentWidth = parseInt($($scope.baseClass).find('ul.carousel-ul li.carousel-li').outerWidth(true));
            $scope.totalContent = $($scope.baseClass).find('ul.carousel-ul li.carousel-li').length;
            $scope.carouselUlWidth = $scope.contentWidth * $scope.totalContent;
            $($scope.baseClass).find('ul.carousel-ul').width($scope.carouselUlWidth);
        };

        $scope.getSlideCount = function() {
            var windowWidth = $(window).width(); //retrieve current window width
            console.log('windowWidth', $('body').width())

            if (typeof $scope.moveImage != 'undefined' && $scope.moveImage > 0) {
                $scope.slideCount = $scope.moveImage;
            } else {
                if (windowWidth >= 960) {
                    $scope.slideCount = 4;
                } else if (windowWidth >= 768) {
                    $scope.slideCount = 3;
                } else if (windowWidth > 600) {
                    $scope.slideCount = 2;
                } else {
                    $scope.slideCount = 1;
                }
            }
        };

        $scope.setDefaultPosition = function() {
            $scope.slidePosTemp = -1 * ($scope.contentWidth * $scope.slideCount);

            for (var i = 0; i < $scope.slideCount; i++) {
                var movedSlide = $($scope.baseClass).find('ul.carousel-ul').find('li.carousel-li:last');
                $($scope.baseClass).find('ul.carousel-ul li.carousel-li:first').before(movedSlide);
            }

            $($scope.baseClass).find('ul.carousel-ul').css('margin-left', $scope.slidePosTemp);
        };

        $scope.addEvent = function() {
            //next link click
            $($scope.baseClass + ' .next').unbind('click').click(function(e) {
                e.preventDefault();

                if ($scope.flag) {
                    $scope.flag = false;
                    $scope.slideCarousel('next');
                }
            });

            //prev link click
            $($scope.baseClass + ' .prev').unbind('click').click(function(e) {
                e.preventDefault();

                if ($scope.flag) {
                    $scope.flag = false;
                    $scope.slideCarousel('prev')
                }
            });
        };

        $scope.slideCarousel = function(direction) {
            if ($scope.contentWidth != '') {
                var defaultPos = $scope.slidePosTemp,
                    moveLeftPos = ($scope.contentWidth * $scope.slideCount);

                if (direction == 'next') {
                    moveLeftPos = -1 * moveLeftPos;
                }

                moveLeftPos = $scope.slidePosTemp + (moveLeftPos)

                $($scope.baseClass).find('ul.carousel-ul').animate({
                    'margin-left': moveLeftPos
                }, $scope.slideSpeed, function() {
                    if (direction == 'next') {
                        for (var i = 0; i < $scope.slideCount; i++) {
                            var movedSlide = $($scope.baseClass).find('ul.carousel-ul').find('li.carousel-li:first');
                            $($scope.baseClass).find('ul.carousel-ul li.carousel-li:last').after(movedSlide);
                        }
                    }

                    if (direction == 'prev') {
                        for (var i = 0; i < $scope.slideCount; i++) {
                            var movedSlide = $($scope.baseClass).find('ul.carousel-ul').find('li.carousel-li:last');
                            $($scope.baseClass).find('ul.carousel-ul li.carousel-li:first').before(movedSlide);
                        }
                    }

                    $($scope.baseClass).find('ul.carousel-ul').css('margin-left', defaultPos);
                    $scope.flag = true;
                });
            }
        };

        $scope.resizeEvent = function() {
            $(window).resize(function() {
                $scope.setCarouselWidth();
                $scope.getSlideCount();

                $scope.slidePosTemp = -1 * ($scope.contentWidth * $scope.slideCount);
                $($scope.baseClass).find('ul.carousel-ul').css('margin-left', $scope.slidePosTemp);
            });
        };

        $scope.mobileSlide = function() {
            var baseClasses = [];
            baseClasses.push($scope.baseClass);
            var x1 = 0;
            var endCoords = {};

            $($scope.baseClass).bind('touchstart', function(event) {
                endCoords = event.originalEvent.targetTouches[0];
                x1 = endCoords.pageX;
            });

            $($scope.baseClass).bind('touchend', function(event) {
                var x2 = endCoords.pageX;
                var diff = parseInt(x2) - parseInt(x1);

                if (diff > 0 && diff > 70) {
                    $(baseClasses + " .sliderButtons .prev").trigger('click');
                } else if (diff < 0 && diff < -70) {
                    $(baseClasses + " .sliderButtons .next").trigger('click');
                }
            });
        };

        $scope.trustyUrl = function(url) {
            return $sce.trustAsResourceUrl(url);
        };

        $scope.videoFinishCallback = function() {
            console.log('Video has finished');
        };

        $scope.openVideoPlayer = function(obj) {
            modalH = parseInt(angular.element($window).height(), 10);
            $scope.modalStyle = { 'height': modalH * 0.8 + 'px', 'width': '100%' };
            $scope.vtitle = obj.title;
            $scope.vdesc = obj.description;
            $scope.videoConfig = obj.videoObj;
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
            $scope.saveHistory(obj);
        };

        $scope.saveHistory = function(obj) {
            $scope.userEmail = $cookies.get('userEmail');
            if (ACCEDO_CONFIG.ADD_HISTORY && ACCEDO_CONFIG.ADD_HISTORY !== "") {
                var historyObj = {
                    title: obj.title,
                    desc: obj.description,
                    user_email: $scope.userEmail,
                    image_url: obj.imgUrl,
                    video_object: obj.videoObj
                };

                httpRequest.postFn(ACCEDO_CONFIG.ADD_HISTORY, historyObj, function(res) {
                    if(res && res.status && res.status === 'success') {
                        console.log('History successfully saved for video', obj.title);
                    } else {
                        console.log('WS error for save history for video', obj.title);
                    }
                });
            }
        };

        function videoEndEvent() {
            angular.element('video').on('ended', function() {
                angular.element('#videoModal').modal('hide');
            });
        }

        angular.element('#videoModal').on('hidden.bs.modal', function() {
            angular.element('.videoContainer').html('');
        })
    }
}
