(function () {

    var app = angular.module("CV", ['ngAnimate', 'datetimePicker']);

    app.config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('errorInterceptor');
    }]);

    app.run(['$rootScope', function ($rootScope) {
        $rootScope.hasThePageBeenLoaded = true;
    }]);

    app.factory("errorInterceptor", ['$q', 'httpCodesConstants', 'redirectService',
        function ($q, httpCodesConstants, redirectService) {
            return {
                'response': function (response) {
                    return response;
                },
                'responseError': function (rejection) {
                    switch (rejection.status) {
                        case httpCodesConstants.internalError:
                            redirectService.redirectToError();
                            break;
                    }

                    return $q.reject(rejection);
                }
            };
        }]);

    app.directive('review', function () {
        return {
            restrict: 'E',
            templateUrl: 'templates/review-form.html',
            controller: 'reviewController'
        }
    });

    app.directive('footer', function () {
        return {
            restrict: 'E',
            templateUrl: 'templates/footer.html'
        }
    });

    app.directive('loading', function () {
        return {
            restrict: 'E',
            templateUrl: 'templates/loading.html'
        }
    });

    app.directive('bkVideo', function () {
        return {
            restrict: 'E',
            templateUrl: 'templates/bk-video.html'
        }
    });

    app.directive('popupHeader', function () {
        return {
            restrict: 'E',
            templateUrl: 'templates/popup-header.html'
        }
    });

    app.directive('navbar', function () {
        return {
            restrict: 'E',
            templateUrl: 'templates/navbar.html',
            controller: 'navbarController'
        }
    });

    app.directive('underConstruction', function () {
        return {
            restrict: 'E',
            templateUrl: 'templates/under-construction.html'
        }
    });

})();