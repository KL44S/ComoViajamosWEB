(function () {

    var app = angular.module("CV");

    app.directive('infoSection', function () {
        return {
            restrict: 'E',
            templateUrl: 'templates/info.html'
        }
    });

})();