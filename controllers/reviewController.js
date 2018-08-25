(function () {

    var app = angular.module("CV");

    app.controller("reviewController", ["$scope", "reviewConstants", "constants", "transportService",
        function ($scope, reviewConstants, constants, transportService) {

            //Privado
            function getFormattedDate(momentDate) {
                momentDate = momentDate.minutes(Math.round(momentDate.minutes() / reviewConstants.minutesRound) * reviewConstants.minutesRound);

                return momentDate;
            }

            function init() {
                $scope.reviewForm = {
                    isReviewFormClosed: true,
                    openSidebarIcon: "icon-menu",
                    closeSidebarIcon: "icon-close"
                };

                $scope.toogleForm = function () {
                    $scope.reviewForm.isReviewFormClosed = !$scope.reviewForm.isReviewFormClosed;
                };

                $scope.transportTypeHasBeenSelected = function (transportTypeId) {
                    transportService.getTransports(transportTypeId).then(function (transports) {
                        $scope.transports = transports;
                    });
                };

                var dateFrom = moment();
                dateFrom = getFormattedDate(dateFrom);
                dateFrom = dateFrom.minutes(dateFrom.minutes() - reviewConstants.minutesBetweeness);
                $scope.dateTimeFrom = dateFrom;

                var dateUntil = moment();
                dateUntil = getFormattedDate(dateUntil);
                $scope.dateTimeUntil = dateUntil;

                transportService.getTransportTypes().then(function (transportTypes) {
                    $scope.transportTypes = transportTypes;

                    $scope.hasThePageBeenLoaded = false;
                });
            }

            //público
            angular.element(document).ready(function () {
                init();
            });

        }]);

})();