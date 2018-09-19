(function () {
    var app = angular.module("CV");

    app.factory("spinnerService", function () {
        var spinnerService = {};

        spinnerService.showSpinner = function (elementId) {
            spinner.showSpinner(elementId);
        };

        spinnerService.hideSpinner = function (elementId) {
            spinner.hideSpinner(elementId);
        };

        return spinnerService;

    });
})();
