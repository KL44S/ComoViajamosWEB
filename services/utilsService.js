(function () {
    var app = angular.module("CV");

    app.factory("utilsService", function () {

        var utilsService = {};

        utilsService.getZeroPaddingNumber = function (number, size) {
            var formattedNumber = number;

            while (formattedNumber.length < size) {
                formattedNumber = "0" + formattedNumber;
            };

            return formattedNumber;
        };


        return utilsService;

    });
})();
