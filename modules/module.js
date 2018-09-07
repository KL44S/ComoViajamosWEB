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
                selectedItem: '=selected',
                items: '=',
                change: '&'
            },
            link: function (scope, element, attrs) {

                function clearItemsFiltered() {
                    for (var i = 0; i < scope.items.length; i++) {
                        var currentItem = scope.items[i];
                        currentItem.filtered = false;
                    };
                };

                function executeCallback() {
                    if (scope.change != undefined) {
                        scope.change({ selectedItem: scope.selected});
                    };
                };

                function doItemHasBeenSelected(item) {
                    scope.selectedItem = item.description;
                    scope.selected = item;

                    clearItemsFiltered();

                    scope.itemSelected = true;
                    scope.isDropDownOpened = false;
                    executeCallback();
                };

                scope.isDropDownOpened = false;
                scope.selected = new SelectOption();

                scope.itemHasBeenSelected = function (item, $event) {
                    if ($event.which === 1) {
                        doItemHasBeenSelected(item);
                    };
                };

                scope.toogleDropdown = function () {
                    scope.isDropDownOpened = !scope.isDropDownOpened;

                    if (scope.isDropDownOpened) {
                        scope.itemSelected = false;
                    };
                };

                scope.openDropdown = function () {
                    scope.isDropDownOpened = true;
                    scope.itemSelected = false;
                };

                scope.onBlur = function () {
                    if (scope.itemSelected === undefined || !scope.itemSelected) {
                        var mustCleanFilter = true;

                        if (scope.selectedItem !== undefined) {

                            if (scope.selected.description != "") {
                                var enteredDescription = scope.selectedItem.toLowerCase();
                                var selectedDescription = scope.selected.description.toLowerCase();

                                mustCleanFilter = (selectedDescription != enteredDescription);
                            };
                        };

                        if (mustCleanFilter) {
                            scope.selected = new SelectOption();
                            scope.selectedItem = "";

                            clearItemsFiltered();
                            executeCallback();
                        };

                        scope.isDropDownOpened = false;
                    };
                };

                scope.filter = function () {
                    scope.selected = new SelectOption();
                    var enteredDescription = scope.selectedItem.toLowerCase();

                    for (var i = 0; i < scope.items.length; i++) {
                        var currentItem = scope.items[i];
                        var currentItemDescription = currentItem.description.toLowerCase();
                        var itemHasMatched = (currentItemDescription.includes(enteredDescription));

                        currentItem.filtered = !itemHasMatched;
                    };
                };
            }
        };
    });

})();