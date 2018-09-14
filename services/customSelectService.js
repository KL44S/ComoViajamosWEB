(function () {
    var html = angular.element(document.getElementsByTagName("html")[0]);
    var appName = html.attr("ng-app");

    var app = angular.module(appName);

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
                        scope.change({ selectedItem: scope.selected });
                    };
                };

                function doItemHasBeenSelected(item) {
                    clearItemsFiltered();

                    item.filtered = true;

                    scope.selectedItem = item.description;
                    scope.selected = item;
                    scope.itemSelected = true;
                    scope.isDropDownOpened = false;

                    executeCallback();
                };

                scope.$watch("items", function () {
                    if (scope.items !== undefined) {
                        scope.areNotThereItems = (scope.items.length === 0);

                        if (scope.items.length === 1) {
                            var onlyItem = scope.items[0];

                            doItemHasBeenSelected(onlyItem);
                        };
                    };

                });

                scope.areNotThereItems = true;
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

    app.factory("customSelectService", function () {

        var customSelectService = {};

        customSelectService.GetCustomSelectArrayOptions = function (array, valueAttribute, descriptionAttribute) {
            var selectArray = [];

            for (var i = 0; i < array.length; i++) {
                var currentElement = array[i];

                var selectOption = new SelectOption(currentElement[valueAttribute], currentElement[descriptionAttribute]);

                selectArray.push(selectOption);
            };

            return selectArray;
        };

        return customSelectService;

    });
})();
