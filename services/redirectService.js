(function () {
    var app = angular.module("CV");

    app.factory("redirectService", ["$window", "constants", function ($window, constants) {

        var redirectService = {};

        redirectService.redirect = function (uri) {
            $window.location.href = uri;
        };

        redirectService.redirectToError = function () {
            redirectService.redirect(constants.interalErrorPath);
        };
        
        return redirectService;

    }]);
})();
