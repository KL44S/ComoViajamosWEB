(function () {

    var app = angular.module("CV");

    app.controller("reviewController", ["$scope", "reviewConstants", "$rootScope", "constants",
        function ($scope, reviewConstants, $rootScope, constants, uibDateParser) {

            //público
            $scope.navbar = {
                isReviewFormClosed: true,
                openSidebarIcon: "icon-menu",
                closeSidebarIcon: "icon-close"
            };

            $scope.toogleForm = function () {
                $scope.navbar.isReviewFormClosed = !$scope.navbar.isReviewFormClosed;
            };

            $scope.dateTimeFrom = new Date();
            $scope.dateTimeUntil = new Date();
        }]);

})();