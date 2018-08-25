(function () {

    var app = angular.module("CV");

    app.controller("reviewController", ["$scope", "reviewConstants", "$rootScope", "constants",
        function ($scope, reviewConstants, $rootScope, constants, uibDateParser) {

            //Privado
            function getFormattedDate(momentDate) {
                momentDate = momentDate.minutes(Math.round(momentDate.minutes() / reviewConstants.minutesRound) * reviewConstants.minutesRound);

                return momentDate;
            }

            //público
            $scope.navbar = {
                isReviewFormClosed: true,
                openSidebarIcon: "icon-menu",
                closeSidebarIcon: "icon-close"
            };

            $scope.toogleForm = function () {
                $scope.navbar.isReviewFormClosed = !$scope.navbar.isReviewFormClosed;
            };

            var dateFrom = moment();
            dateFrom = getFormattedDate(dateFrom);
            dateFrom = dateFrom.minutes(dateFrom.minutes() - reviewConstants.minutesBetweeness);
            $scope.dateTimeFrom = dateFrom;

            var dateUntil = moment();
            dateUntil = getFormattedDate(dateUntil);
            $scope.dateTimeUntil = dateUntil;
        }]);

})();