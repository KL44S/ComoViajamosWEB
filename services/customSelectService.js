(function () {
    var app = angular.module("CV");

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
