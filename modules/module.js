(function () {

    var app = angular.module("CV", ['ngAnimate', 'moment-picker']);

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

    app.directive('customSelect', function () {
        return {
            restrict: 'E',
            templateUrl: 'templates/custom-select.html',
            scope: {
                bind: '=',
                items: '='
            },
            link: function (scope, element, attrs) {

                function clearItemsFiltered() {
                    for (var i = 0; i < scope.items.length; i++) {
                        var currentItem = scope.items[i];
                        currentItem.filtered = false;
                    }
                }

                scope.isDropDownOpened = false;

                scope.itemHasBeenSelected = function (item, $event) {
                    if ($event.which === 1) {
                        scope.selectedItem = item.description;
                        scope.bind = item;

                        clearItemsFiltered();

                        scope.itemSelected = true;
                        scope.isDropDownOpened = false;
                    }
                };

                scope.toogleDropdown = function () {
                    scope.isDropDownOpened = !scope.isDropDownOpened;

                    if (scope.isDropDownOpened) {
                        scope.itemSelected = false;
                    }
                };

                scope.onBlur = function () {
                    if (scope.itemSelected === undefined || !scope.itemSelected) {
                        var mustCleanFilter = true;

                        if (scope.selectedItem !== undefined) {
                            var enteredDescription = scope.selectedItem.toLowerCase();

                            if (scope.selectedItem !== undefined) {
                                var selectedDescription = scope.bind.description.toLowerCase();

                                mustCleanFilter = (selectedDescription != enteredDescription);
                            };
                        };

                        if (mustCleanFilter) {
                            scope.selectedItem = "";
                            clearItemsFiltered();
                        };

                        scope.isDropDownOpened = false;
                    };
                };

                scope.filter = function () {
                    var enteredDescription = scope.selectedItem.toLowerCase();

                    for (var i = 0; i < scope.items.length; i++) {
                        var currentItem = scope.items[i];
                        var currentItemDescription = currentItem.description.toLowerCase();
                        var itemHasMatched = (currentItemDescription.includes(enteredDescription));

                        currentItem.filtered = !itemHasMatched;
                    }
                };
            }
        };
    });

})();