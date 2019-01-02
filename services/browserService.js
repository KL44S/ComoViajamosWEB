(function () {
    var app = angular.module("CV");

    app.factory("browserService", ["$window", function ($window) {

        var browserService = {};

        browserService.browsers = {
            chrome: 0,
            safari: 1,
            ie: 2,
            firefox: 3,
            edge: 4,
            opera: 5
        };

        browserService.getCurrentBrowser = function () {
            var userAgent = $window.navigator.userAgent;

            var found = false;
            var currentBrowser = undefined;
            var index = 0;
            var browsers = [
                /chrome/i,
                /safari/i, 
                /internet explorer/i,
                /firefox/i, 
                /edge/i,
                /opera/i]

            while (index < browsers.length && !found) {
                currentBrowser = browsers[index];

                if (currentBrowser.test(userAgent)) {
                    found = true;
                }
                else {
                    index++;
                };           
            };

            return index;
        };

        return browserService;

    }]);
})();
