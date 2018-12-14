(function () {

    var app = angular.module("CV");

    app.controller("mainController", ["$scope", "popupService", function ($scope, popupService) {
        $scope.enterReview = function () {
            popupService.open(new PopupParameters($scope,
                "templates/review-form.html",
                "reviewController",
                "sm"));
        };
    }]);

})();