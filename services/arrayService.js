(function () {
    var app = angular.module("CV");

    app.factory("arrayService", function () {

        var arrayService = {};

        arrayService.getIndexOfArrayElementInArray = function (element, array) {
            var index = 0;
            var found = false;
            var arrayLength = array.length;

            while (index < arrayLength && !found) {
                var currentElement = array[index];
                found = currentElement == element;

                index++;
            };

            var foundIndex = -1;

            if (found) {
                foundIndex = index - 1;
            };

            return foundIndex;
        };

        arrayService.getArrayElementsByFilters = function (array, filters) {
            var matchedElements = [];

            for (var i = 0; i < array.length; i++) {
                var currentElement = array[i];
                var j = 0;
                var elementPassFilters = true;

                while (elementPassFilters && j < filters.length) {
                    var currentFilter = filters[j];
                    var elementValue = currentElement[currentFilter.attribute];

                    elementPassFilters = (elementValue == currentFilter.attributeValue);

                    j++;
                };

                if (elementPassFilters) {
                    matchedElements.push(currentElement);
                };
            };

            return matchedElements;
        };

        arrayService.getFirstArrayElementByFilters = function (array, filters) {
            var matchedElement = undefined;
            var i = 0;
            var elementFound = false;

            while (!elementFound && i < array.length) {
                var currentElement = array[i];
                var j = 0;
                var elementPassFilters = true;

                while (elementPassFilters && j < filters.length) {
                    var currentFilter = filters[j];
                    var elementValue = currentElement[currentFilter.attribute];

                    elementPassFilters = (elementValue == currentFilter.attributeValue);

                    j++;
                };

                if (elementPassFilters) {
                    matchedElement = currentElement;
                    elementFound = true;
                };

                i++;
            };

            return matchedElement;
        };

        return arrayService;

    });
})();
