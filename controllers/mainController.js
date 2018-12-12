(function () {

    var app = angular.module("CV");

    app.controller("mainController", ["$scope", "popupService", function ($scope, popupService) {

        $scope.datePicker = {
            date: new Date(),
            minDate: new Date(),
            maxDate: new Date(2018, 11, 25)
        };

        $scope.enterReview = function () {
            popupService.open(new PopupParameters($scope,
                "templates/review-form.html",
                "reviewController",
                "sm"));
        };
    }]);

})();